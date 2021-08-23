from flask import Flask, request, Response
import json
import pandas as pd
import numpy as np
import re
import nltk
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
from flask_cors import CORS
import mysql.connector



app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
   host     = 'bpkttu857tad9vensizb-mysql.services.clever-cloud.com',
  user     = 'uhnwj0ogm1azhs5o',
  password = 'xBgoC8R0HY6InKHbsteW',
    database="bpkttu857tad9vensizb"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM Movie")

df = pd.DataFrame(mycursor.fetchall())
df.columns = mycursor.column_names
mydb.close()

df = df.fillna(' ')

stop = set(stopwords.words('english'))
df['keywords'] = df['description'].str.split().apply(lambda x: [item for item in x if item not in stop])
df['keywords'] = df['keywords'].str.join(' ')
df['genre'] = df['genre'].str.replace(',', '')
df['actors'] = df['actors'].str.replace(',', '')
df['writer'] = df['writer'].str.replace(',', '')
df['director'] = df['director'].str.replace(',', '')
df['keywords'] = df['keywords'].str.lower()
df = df.astype(str)

#combine features into bag of words
def combine_features(row):
    return row['director'] + " " + row['genre'] + " " + row['actors'] + " " + row['keywords']
df['bow'] = df.apply(combine_features, axis=1)
df1=df

cv = CountVectorizer()
count_matrix = cv.fit_transform(df1['bow'])
cos_sim = cosine_similarity(count_matrix)

for raw in cos_sim:
    index=0
    for x in raw:
        if df1['votes'][index] !="0":
            x=x+int(df1['votes'][index])/(int(df1['votes'][index])*100)
        index+=1
    break 


features_imdb = df1[['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes']].reset_index()
def recommend_sim_features(movie):
    
    movie_index = features_imdb[features_imdb['title'] == movie]['index'].values[0] #get index from movie title to retrieve similarity scores from the similarity matrix
    sim_scores = pd.Series(cos_sim[movie_index]).sort_values(ascending=False) #find the highest similarity scores
    sim_feat_movies = pd.DataFrame({ 'score' : sim_scores[1:101]}).reset_index() #Create dataframe with the movies' 100 highest scored movies (itself excluded)
    sim_feat_movies = sim_feat_movies.merge(features_imdb) #merge with features_imdb to retrieve movie_id and year
    sim_feat_movies = sim_feat_movies[['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes','score']] #change order of columns and drop index
    return sim_feat_movies

def movie_recommender_cb(user_movies, n=100):
    recommended_movies = pd.DataFrame() #create dataframe to append similar movies
    #Loop through list one by one and append every returned dataframe to recommended_movies
    for item in user_movies:
        movie= item[0]
        #Error management in case of a movie in the list can't be found in the dataset
        try:
            recommended_movies = recommended_movies.append(recommend_sim_features(movie))
        except: print(movie + ' was not in the IMDb dataset')    
    #Group movies and sum the score, sort by highest score descending
    recommended_movies = recommended_movies.groupby(['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes','score']).sum().sort_values('score', ascending=False).reset_index()
    return recommended_movies.head(n) #return n (default=100) most similar movies

def movie_recommender(movie, n=100):
    recommended_movies = pd.DataFrame() #create dataframe to append similar movies
    #Loop through list one by one and append every returned dataframe to recommended_movies
    try:
        recommended_movies = recommended_movies.append(recommend_sim_features(movie))
    except: print(movie + ' was not in the IMDb dataset')    
    #Group movies and sum the score, sort by highest score descending
    recommended_movies = recommended_movies.groupby(['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes','score']).sum().sort_values('score', ascending=False).reset_index()
    return recommended_movies.head(n) #return n (default=100) most similar movies

@app.route('/', methods=['GET'])
def runAlgorithm():
  return "Dragos"

@app.route('/test', methods=['POST'])
def runAlgorithm2():
    request_data = request.get_json()
    test_list_imdb = request_data['test_list_imdb']
    recommanded=movie_recommender_cb(test_list_imdb, 5)
    recomanded_json=recommanded.to_json(orient="records")
    response = app.response_class(
        response=recomanded_json,
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/reco/movie', methods=['POST'])
def runAlgorithm3():
    request_data = request.get_json()
    title = request_data['title']
    recommanded=movie_recommender(title,5)
    recomanded_json=recommanded.to_json(orient="records")
    response = app.response_class(
        response=recomanded_json,
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == "__main__":
    app.run()