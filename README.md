# 🎮 Gamer Portfolio App

## 📘 **概要**
Gamer Portfolio Appは、ゲーマーが自分のプロフィールを作成し、他のゲーマーとつながるためのTwitch風ウェブアプリです。ユーザーは自分のプロフィールを作成し、使用しているデバイスやプレイしているゲームを公開できます。さらに、他のユーザーをフォローしたり、フォローされたりすることで、ゲーマー同士のつながりを生み出します。

## ✨ **主な機能**
- **ユーザー登録 / ログイン機能**（Google, Twitter, Discordでログイン可能）
- **プロフィール作成 / 編集**（ユーザー名、自己紹介、SNSリンク、使用デバイス、プレイ中のゲーム）
- **デバイス選択機能**（PC, PS5, Switch, スマホの選択が可能、バッジとして表示）
- **他ユーザーのフォロー機能**
- **ユーザー検索機能**（名前検索、ゲームでのフィルタリング）
- **Rawg.io APIを使ったゲーム情報の取得**（ゲームアイコンやタイトルなど）
- **ランキング表示**（人気のユーザー、ゲーム、デバイスを表示）

将来的には、Amazonアフィリエイトによるポイント制度や投稿機能の追加も検討しています。

---

## 🛠️ **技術スタック**
| **分野**        | **技術 / ツール**             |
|-----------------|---------------------------|
| **フロントエンド** | Next.js, Tailwind CSS    |
| **バックエンド**   | Firebase Firestore       |
| **認証**          | Firebase Authentication   |
| **API連携**       | Rawg.io API              |
| **デプロイ**       | Vercel                   |

---

## 🚀 **開発環境のセットアップ**

### 1️⃣ **必要なツールのインストール**
- **Node.js** (v16以上) - [Node.js公式サイト](https://nodejs.org/)
- **Git** - [Git公式サイト](https://git-scm.com/)
- **Firebase CLI** - [Firebase CLIインストールガイド](https://firebase.google.com/docs/cli)

---

### 2️⃣ **ローカル環境のセットアップ**

#### 1. **リポジトリのクローン**
```bash
# GitHubからリポジトリをクローン
git clone https://github.com/your-username/gamer-portfolio-app.git

# 作業ディレクトリに移動
cd gamer-portfolio-app
```

#### 2. **パッケージのインストール**
```bash
# npmで依存パッケージをインストール
npm install
```

#### 3. **Firebaseの設定ファイルを追加**
- Firebaseコンソールから「Firebaseプロジェクト」を作成し、認証（Authentication）とFirestoreを有効化してください。
- `firebaseConfig.js` ファイルを`/src/config/`ディレクトリに追加します。内容は以下のようになります：
  ```javascript
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  export default firebaseConfig;
  ```
  
  `YOUR_API_KEY` や `YOUR_PROJECT_ID` は、Firebaseコンソールから取得してください。

---

### 3️⃣ **サーバーの起動**
```bash
# 開発サーバーを起動
npm run dev
```

- ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスして、アプリが正しく動作することを確認してください。

---

## 🚀 **デプロイ方法**

このプロジェクトは **Vercel** を使ってデプロイされます。デプロイ手順は以下の通りです：

#### 1. **Vercelアカウントの作成**
- [Vercel](https://vercel.com/) にアカウントを作成してください。

#### 2. **GitHubリポジトリとVercelを連携**
- Vercelのダッシュボードから、「新しいプロジェクトを追加」を選択し、GitHubのリポジトリを選択します。

#### 3. **環境変数の設定**
- Vercelの「プロジェクト設定」から、**環境変数** (`FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, など) を設定してください。これらの情報は、Firebaseコンソールから取得できます。

#### 4. **デプロイ**
- Vercelの「デプロイ」ボタンを押せば、自動的にデプロイが始まります。

---

## 📂 **プロジェクト構成**
```
project-root/
├── public/            # 静的ファイル (画像、アイコンなど)
├── src/               # ソースコード
│   ├── components/   # Reactコンポーネント
│   ├── pages/        # Next.jsのページファイル
│   ├── config/       # Firebase設定ファイル
│   └── styles/       # Tailwind CSSのスタイル
├── firebase.json     # Firebase CLI設定ファイル
├── .env.local        # ローカル環境の環境変数
├── package.json      # 依存パッケージ
└── README.md        # このファイル
```

---

## 🔥 **今後の機能追加予定**
- **ポイント機能**: フォローやAmazonアフィリエイト購入に応じたポイントシステムを導入予定
- **投稿機能**: ユーザーがコンテンツを投稿し、他のユーザーが「いいね」できる機能（未実装）

---

## 🤝 **コントリビューション**
1. フォークしてください。
2. 新しいブランチを作成してください (`git checkout -b feature/新機能名`)
3. 変更をコミットしてください (`git commit -m '新機能追加'`)
4. ブランチにプッシュしてください (`git push origin feature/新機能名`)
5. プルリクエストを送ってください！

---

## 📝 **ライセンス**
このプロジェクトはMITライセンスの下でリリースされています。詳しくは`LICENSE`ファイルを参照してください。

---

## 📞 **サポート**
バグの報告や機能のリクエストがあれば、GitHubの[Issues](https://github.com/your-username/gamer-portfolio-app/issues)に報告してください。
