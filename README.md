# Fullstack CRUB application for homework 2

## Instruction:

**Note:**: you need to have NodeJS and Python installed first.

1. Clone my repository by this command in anywhere you want:

    `git clone https://github.com/thphamUMBC/cmsc447_hw2.git FOLDER_NAME`

2. Go into that folder and right click to open terminal or you can go into that folder by:

    `cd path/to/your/FOLDER_NAME`

3. Install npm package by command:

    `npm i`

4. Install virtualenv in python by command:
    
    `pip install virtualenv`

5. Create virtualenv in backend folder. Before you create it, delete `env` folder first, then run this command in root folder (`FOLDER_NAME`):

    `python -m venv .\backend\`

6. Install flask, flask-cors, and python-dotenv:

    `.\backend\env\Scripts\activate`

    `pip install flask flask-cors python-dotenv`

7. Start your backend. Before you start, go to `package.json` and modify `start-backend-windows` into
`"start-backend-windows": "cd backend && .\\Scripts\\flask.exe run --no-debugger"`. Now, you can start
your backend by this command **in different terminal**:

    `npm run start-backend-windows`

8. Start your application **in different terminal**:

    `npm start`

