# I am buildin a spam mail detaion application
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import accuracy_score, confusion_matrix, classification_report


# Load the data
def check_spam(text):
    df = pd.read_csv("mail_data.csv", encoding="latin-1")
    # print(df.head())

    # replace null values with a null string
    mail_data = df.where((pd.notnull(df)), "")

    # lable spam mail as o and ham mail as 1
    mail_data.loc[
        mail_data["Category"] == "spam",
        "Category",
    ] = 0

    mail_data.loc[
        mail_data["Category"] == "ham",
        "Category",
    ] = 1

    # seperate the data as texts and lables
    X = mail_data["Message"]
    Y = mail_data["Category"]

    # split data into training and testing data
    X_train, X_test, y_train, y_test = train_test_split(
        X, Y, test_size=0.2, random_state=0
    )

    # fransform the text data to feature vectors that can be used as input to logistic regression model

    fecture_extraction = TfidfVectorizer(
        min_df=1, stop_words="english", lowercase="True"
    )
    X_train_features = fecture_extraction.fit_transform(X_train)
    X_test_features = fecture_extraction.transform(X_test)

    # convert y_train and y_test values as integers
    y_train = y_train.astype("int")
    y_test = y_test.astype("int")

    # training the model using logistic regression and predict the performance on test data
    model = LogisticRegression()
    model.fit(X_train_features, y_train)

    input_mail_features = fecture_extraction.transform([text])

    # # make a prediction
    prediction = model.predict(input_mail_features)
    if prediction == 0:
        return True
    else:
        return False


# x = "Had your mobile 11 months or more? U R entitled to Update to the latest colour mobiles with camera for Free! Call The Mobile Update Co FREE on 08002986030"
# if __name__ == "__main__":
#     text = input("Enter your mail: ")
#     print(check_spam(x))
