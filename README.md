# [Bun](https://bun.sh/)を使用してWeb APIを作って遊ぶ

## セットアップ

### Bunのインストール

```bash
curl -fsSL https://bun.sh/install | bash
```

### 開発に必要なパッケージのインストール等

```bash
bun run setup
```

## 開発用サーバーの起動

[HTTP server – API | Bun Docs](https://bun.sh/docs/api/http)

```bash
bun dev
```

## ビルド

[Bun.build – Bundler | Bun Docs](https://bun.sh/docs/bundler)

```bash
bun run build
```

### ビルドしたバイナリの実行

```bash
bun run start
```
