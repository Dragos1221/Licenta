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
# imdb = pd.read_csv(r"C:\Users\drago\Desktop\New folder\IMDb movies.csv")


# df = imdb[['imdb_title_id','title', 'year', 'genre', 'language', 'director', 'writer', 'actors', 'description']]

df = df.fillna(' ')

stop = set(stopwords.words('english'))
df['keywords'] = df['description'].str.split().apply(lambda x: [item for item in x if item not in stop])
df['keywords'] = df['keywords'].str.join(' ')
# df.drop('description', axis=1, inplace=True)


# df['imdb_title_id'] = df['imdb_title_id'].str.extract(r'([1-9][0-9]*|0)\b', expand=False)
# df = df.rename(columns={'imdb_title_id':'movie_id'})
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
# df1 = df.head(10000)
df1=df

cv = CountVectorizer()
count_matrix = cv.fit_transform(df1['bow'])
cos_sim = cosine_similarity(count_matrix)

features_imdb = df1[['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes']].reset_index()
def recommend_sim_features(movie, rating):
    
    movie_index = features_imdb[features_imdb['title'] == movie]['index'].values[0] #get index from movie title to retrieve similarity scores from the similarity matrix
    
    sim_scores = pd.Series(cos_sim[movie_index]).sort_values(ascending=False) #find the highest similarity scores
    
    sim_feat_movies = pd.DataFrame({ 'score' : sim_scores[1:101]*(rating-2.5)}).reset_index() #Create dataframe with the movies' 100 highest scored movies (itself excluded)
    sim_feat_movies = sim_feat_movies.merge(features_imdb) #merge with features_imdb to retrieve movie_id and year
    sim_feat_movies = sim_feat_movies[['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes','score']] #change order of columns and drop index
    
    return sim_feat_movies

def movie_recommender_cb(user_movies, n=100):
    recommended_movies = pd.DataFrame() #create dataframe to append similar movies
    #Loop through list one by one and append every returned dataframe to recommended_movies
    for item in user_movies:
        movie= item[0]
        rating = item[1]
        #Error management in case of a movie in the list can't be found in the dataset
        try:
            recommended_movies = recommended_movies.append(recommend_sim_features(movie, rating))
        except: print(movie + ' was not in the IMDb dataset')    
    #Group movies and sum the score, sort by highest score descending
    recommended_movies = recommended_movies.groupby(['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes','score']).sum().sort_values('score', ascending=False).reset_index()
    return recommended_movies.head(n) #return n (default=100) most similar movies

def movie_recommender(movie,rating, n=100):
    recommended_movies = pd.DataFrame() #create dataframe to append similar movies
    #Loop through list one by one and append every returned dataframe to recommended_movies
    try:
        recommended_movies = recommended_movies.append(recommend_sim_features(movie, rating))
    except: print(movie + ' was not in the IMDb dataset')    
    #Group movies and sum the score, sort by highest score descending
    recommended_movies = recommended_movies.groupby(['id', 'title', 'genre', 'country', 'director', 'writer', 'actors','description', 'rating', 'votes','score']).sum().sort_values('score', ascending=False).reset_index()
    return recommended_movies.head(n) #return n (default=100) most similar movies

# test_list_imdb = [('Miss Jerry', 4), ("Cleopatra", 3)]
# #return top 5 highest scored movies
# print(movie_recommender_cb(test_list_imdb, 5))

@app.route('/', methods=['GET'])
def runAlgorithm():

  return "Dragos"

@app.route('/test', methods=['POST'])
def runAlgorithm2():
    request_data = request.get_json()
    test_list_imdb = request_data['test_list_imdb']
    print(type(test_list_imdb[0]))
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
    rating = request_data['rating']

    recommanded=movie_recommender(title,rating, 5)
    recomanded_json=recommanded.to_json(orient="records")
    response = app.response_class(
        response=recomanded_json,
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == "__main__":
    app.run()