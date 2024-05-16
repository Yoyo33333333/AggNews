import requests
import json

CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

def fetch_articles(api_key, category):
    url = f'https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['articles']
    else:
        print(f"Failed to fetch articles for category: {category}")
        return None

def save_articles_to_json(articles, filename):
    with open(filename, 'w') as json_file:
        json.dump(articles, json_file, indent=4)

def extract_article_info(article, category):
    return {
        'title': article['title'],
        'category': category,
        'content': article['content'],
        'url': article['url']
    }

def main():
    api_key = '3991968999b844bab36533bc65292531'
    all_articles = []
    for category in CATEGORIES:
        articles = fetch_articles(api_key, category)
        if articles:
            formatted_articles = [extract_article_info(article, category) for article in articles]
            all_articles.extend(formatted_articles)
    
    if all_articles:
        save_articles_to_json(all_articles, 'articles.json')
        print("Articles saved to articles.json")
    else:
        print("No articles fetched")

if __name__ == "__main__":
    main()