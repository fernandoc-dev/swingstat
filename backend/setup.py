from setuptools import setup, find_packages

setup(
    name="swingstat-backend",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "alembic",
        "psycopg2-binary",
        "python-dotenv",
        "pydantic",
        "pydantic-settings",
    ],
)
