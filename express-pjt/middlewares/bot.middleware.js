const blockedBots = [
  "GPTBot", // OpenAI GPTBot
  "ChatGPT-User", // ChatGPT 브라우징/에이전트 계열
  "CCBot", // Common Crawl Bot
  "ClaudeBot", // Anthropic Claude Bot
  "PerplexityBot", // Perplexity Bot
  "Google-Extended", // Google AI 학습 관련 크롤러
  "Bytespider", // ByteDance/TikTok 계열 크롤러
  "Amazonbot", // Amazon Bot
  "Scrapy", // Python 스크래핑 라이브러리
  "curl", // 터미널에서 보내는 요청 도구
  "python-requests", // Python requests 라이브러리
];

function botMiddleware(req, res, next) {
  const userAgent = req.headers["user-agent"] || ""; //헤더스에 담긴 user-agent를 보고 사용자인지 봇인지 판단, 없을수가 없지만 혹시나 없으면 빈문자열

  const isBot = blockedBots.some((botName) =>
    userAgent.toLowerCase().includes(botName.toLowerCase()),
  );

  if (isBot) {
    return res.status(403).json({
      isError: true,
      message: "봇 접근이 차단되었습니다.",
    });
  }
  next();
}

module.exports = botMiddleware;
