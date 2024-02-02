# Microsoft TODO clone on redux, rtk-query, sass and db-json

## Why even do this?
The main reason to build the project is to *learn to code how we code*. This principle I heard about is very popular nowadays and I also noticed the importance of it in book "Make it stick", what made me change some approches to my learning style and lead to this project and other future projects too. 
Another reason was of course a willing to study Redux. That's my first more or less searious project usign Redux. To learn that I knew i had to build something and that's how it ended.

## Why Microsoft Todo?
Cool app, which I used for some time for managing own studying and was curious to remake it in web. But more important reason is to challagne myself and truly check my abiliteis in a new tech I'm about to master. 
Also Microsoft todo provides some field to think about different ways of implementation, yet being not so hard to structurize, first time building on a new tech stack.

## What did you learn from it?
I have a strong list of things I'm free to use after this project:
- Creating `slices` and `actions` for local variables
- Concept of single source of truth 
- Work with asynch Redux using:
    - RTK query 
    - `createAsyncThunnk` (redux-toolkit)
- Learned concept and usage of `useReducer` hook
- Can work with tags and cashing data 
- Concept of `middlewares` and their purpose in Redux
- Full understand of data flow in Redux apps 

Everything listed above was learned by facing different problems with actual coding or not understanding the concept fully, what lead to future investigation.
This time learning a new tech was the first time I opened myself the beauty and power of docs: I started my learning process based on that, since that's the only place, where all topics where listed and I could get full understand of what should I know and be aware of. Redux and especially RTK Query docs where read for 50-70% of all content provieded there. It was the first time diving deeply in docs and that's a huge jump in my future learning curve 


## Screenshots
![Opera Знімок_2024-02-02_135856_localhost](https://github.com/Maxv1z/microsoft-todo-clone-on-redux/assets/122612827/237a9279-92c9-4c82-8c58-fb8d44be2483)
![Opera Знімок_2024-02-02_135941_localhost](https://github.com/Maxv1z/microsoft-todo-clone-on-redux/assets/122612827/95310ddd-1116-4535-853a-188115628f1c)
![Opera Знімок_2024-02-02_1359![Opera Знімок_2024-02-02_140042_localhost](https://github.com/Maxv1z/microsoft-todo-clone-on-redux/assets/122612827/40b7c6b1-806d-4962-b6af-00f62f9f2af6)
18_localhost](https://github.com/Maxv1z/microsoft-todo-clone-on-redux/assets/122612827/e191c565-0774-4b54-a1b7-d8a7dbee5713)
![Opera Знімок_2024-02-02_135856_localhost](https://github.com/Maxv1z/microsoft-todo-clone-on-redux/assets/122612827/97ae4cf7-a893-43b8-9131-a461487e1ac4)
![Opera Знімок_2024-02-02_140042_localhost](https://github.com/Maxv1z/microsoft-todo-clone-on-redux/assets/122612827/fd2b6370-f3d5-4a4d-9fe4-48a3646bfbf3)



## Run Locally 

Clone the project

```bash
git clone https://github.com/Maxv1z/microsoft-todo-clone-on-redux.git
```

Go to the project directory
```bash
cd microsoft-todo-clone-on-redux
```

Install dependencies
```bash
npm install
```

Start the client server (Vite)
```bash
npm run dev
```

Run the DB (using json-db)
```bash
json-server --port 3500 ./data/db.json
```

