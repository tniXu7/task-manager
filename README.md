# task-manager
# Менеджер задач (Task Manager)

## Описание
Это веб-приложение для управления задачами. Поддерживает создание, редактирование, удаление задач, установку сроков выполнения, напоминания, а также интеграцию с календарем.

## Стек технологий
- **Фронтенд:** HTML, CSS, JavaScript  
- **Бэкенд:** Node.js, Express  
- **База данных:** PostgreSQL  
- **Контейнеризация:** Docker  

## Запуск проекта

### 1. Клонирование репозитория
git clone https://github.com/твой-репозиторий/task-manager.git cd task-manager

### 2. Настройка переменных окружения
Создай файл `.env` в папке `backend` и добавь в него:  
DATABASE_URL=postgresql://postgres:пароль@task-manager-db-1:5432/taskdb PORT=5000

### 3. Запуск с помощью Docker
Убедись, что у тебя установлен [Docker](https://www.docker.com/), затем запусти команду:
docker-compose up --build
Это создаст и запустит контейнеры с базой данных, бэкендом и фронтендом.

### 4. Доступ к приложению
После запуска:
- **Фронтенд:** `http://localhost:3000`
- **Бэкенд:** `http://localhost:5000`
- **База данных (pgAdmin или psql):** `postgres://postgres:пароль@localhost:5432/taskdb`

### 5. Остановка контейнеров
docker-compose down
## Разработка и отладка
### Запуск бэкенда локально (без Docker)
cd backend npm install npm start
### Запуск фронтенда локально (без Docker)
cd backend npm install npm start

### Запуск фронтенда локально (без Docker)
cd frontend npm install npm start

## Дополнительно
- Для работы с базой данных используй `psql` или pgAdmin.
- Если у тебя проблемы с правами доступа, попробуй `sudo docker-compose up --build`.

---
🔥 Удачной работы над проектом! 🚀  

