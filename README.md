# 最小フルスタックサンプル
簡易のためデプロイ先はHeroku

- TypeScript
- pnpm+husky
- Jest
- React+Redux Toolkits+React Router
- NestJS+Open API(Swagger)
- prisma+PostgresSQL

# セットアップ
環境変数を`backend/.env`に追加します。

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/example?schema=public"
# JWT_SECRET_KEYは以下のコマンドで払い出し
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET_KEY="d9a6f1b9c147b7037c6540586dd2285bae049843ee9144cd3250407c58c06b21"
```

herokuの構築

```
# heroku cliインストール
$ brew tap heroku/brew && brew install heroku

# herokuにログイン
$ heroku login

# herokuに`APP_NAME`アプリ作成
$ heroku create ${APP_NAME}

# herokuの`APP_NAME`のアプリを作成してgitを紐づけ
$ heroku git:remote -a ${APP_NAME}

# herokuのPostgresを作成
$ heroku addons:create heroku-postgresql:essential-0

# herokuに環境変数をセット（DATABASE_URLはHeroku側で自動付与されるので不要）
$ heroku config:set JWT_SECRET_KEY="d9a6f1b9c147b7037c6540586dd2285bae049843ee9144cd3250407c58c06b21"
$ heroku config
```

# 起動方法
pnpm workspaceで構築しているため、ワークスペーストップで起動します。  

```
# DockerコンテナでDBミドルウェア起動
$ docker compose up -d

# パッケージインストール
$ pnpm install

# prisma初期化
$ pnpm run init-app

# 起動
$ pnpm run dev
```

# API変更時のSwagger定義更新
APIエンドポイント変更時に`openapi-config.ts`を編集し、該当エンドポイントのControllerを追加します。  
以下のコマンドでswagger.jsonからフロントエンド側で使う、  
RTK Queryの型堅牢なAPI呼び出しインタフェースが自動生成します。  

```
$ cd backend
$ pnpm run openapi
```

# デプロイ

`Procfile`に基づいてHerokuにデプロイする

```
$ git push heroku main
```