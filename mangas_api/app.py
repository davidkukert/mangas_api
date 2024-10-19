from fastapi import FastAPI

app = FastAPI(
    title='Manga API',
    description='API for managing a collection of manga',
    version='0.1.0',
)


@app.get('/')
def read_root():
    return {'message': 'Welcome to the Manga API!'}
