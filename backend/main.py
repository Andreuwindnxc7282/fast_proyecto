from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI()

# Modelo de tarea
class Task(BaseModel):
    title: str
    description: str
    due_date: str

# Lista simulada de tareas
tasks_db = []

@app.get("/", status_code=200)
def read_root():
    return {"message": "Bienvenido a la API de tareas"}

@app.post("/tasks/", response_model=Task)
def create_task(task: Task):
    task_id = str(uuid.uuid4())
    tasks_db.append({**task.dict(), "id": task_id})
    return {**task.dict(), "id": task_id}

@app.get("/tasks/", response_model=List[Task])
def get_tasks():
    return tasks_db

@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    global tasks_db
    tasks_db = [task for task in tasks_db if task["id"] != task_id]
    return {"message": "Task deleted successfully"}