import React from "react"

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gfolioへようこそ</h1>
      <p className="text-gray-300 mb-4">
        Gfolioは、あなたの個人ポートフォリオと進捗管理プラットフォームです。プロジェクトを紹介し、進捗を追跡し、他のプロフェッショナルとつながりましょう。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">あなたのプロジェクト</h2>
          <p className="text-gray-400">
            スキルと経験を示すプロジェクトを追加し始めましょう。
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">進捗管理</h2>
          <p className="text-gray-400">
            当サイトの追跡ツールを使って、時間とともに成長と成果を監視しましょう。
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
