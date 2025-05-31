const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000';

async function publishAllArticles() {
  try {
    console.log('📰 全ての記事を公開状態に変更します...\n');

    // 1. 未公開記事を取得
    console.log('🔍 未公開記事を取得中...');
    const unpublishedResponse = await axios.get(`${API_BASE_URL}/api/v1/news`, {
      params: {
        published: false,
        limit: 1000 // 大きな値を設定して全件取得
      }
    });

    const unpublishedArticles = unpublishedResponse.data.items;
    console.log(`📋 未公開記事: ${unpublishedArticles.length}件\n`);

    if (unpublishedArticles.length === 0) {
      console.log('✅ 全ての記事が既に公開されています！');
      return;
    }

    // 2. 各記事を公開状態に更新
    let successCount = 0;
    let errorCount = 0;

    for (const article of unpublishedArticles) {
      try {
        console.log(`📝 記事ID ${article.id}: "${article.title}" を公開中...`);
        
        await axios.put(`${API_BASE_URL}/api/v1/news/${article.id}`, {
          published: true
        });

        successCount++;
        console.log(`✅ 記事ID ${article.id} を公開しました`);
      } catch (error) {
        errorCount++;
        console.error(`❌ 記事ID ${article.id} の公開に失敗: ${error.message}`);
      }
    }

    console.log('\n📊 結果:');
    console.log(`✅ 成功: ${successCount}件`);
    console.log(`❌ 失敗: ${errorCount}件`);

    // 3. 最終確認
    console.log('\n🔍 最終確認中...');
    const finalCheckResponse = await axios.get(`${API_BASE_URL}/api/v1/news`, {
      params: {
        published: true,
        limit: 1000
      }
    });

    const publishedCount = finalCheckResponse.data.total;
    console.log(`📈 現在の公開記事数: ${publishedCount}件`);

    const remainingUnpublishedResponse = await axios.get(`${API_BASE_URL}/api/v1/news`, {
      params: {
        published: false,
        limit: 1000
      }
    });

    const remainingUnpublished = remainingUnpublishedResponse.data.total;
    console.log(`📉 残りの未公開記事数: ${remainingUnpublished}件`);

    if (remainingUnpublished === 0) {
      console.log('\n🎉 全ての記事が正常に公開されました！');
    } else {
      console.log('\n⚠️  一部の記事が未公開のままです。');
    }

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    if (error.response) {
      console.error('レスポンス:', error.response.data);
    }
    process.exit(1);
  }
}

// スクリプト実行
publishAllArticles(); 