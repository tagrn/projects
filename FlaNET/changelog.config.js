module.exports = {
  "disableEmoji": false,
  "list": [
    "feat",
    "docs",
    "fix",
    "chore",
    "test",
    "build",
    "refactor",
    "style",
    "ci"
  ],
  "maxMessageLength": 64,
  "minMessageLength": 3,
  "questions": [
    "type",
    "subject",
    "body",
    "issues"
  ],
  "types": {
    "chore": {
      "description": "자잘한 작업",
      "emoji": "🤖",
      "value": "chore"
    },
    "ci": {
      "description": "CI관련 설정",
      "emoji": "🎡",
      "value": "ci"
    },
    "docs": {
      "description": "문서 수정",
      "emoji": "✏️",
      "value": "docs"
    },
    "feat": {
      "description": "새로운 기능 추가",
      "emoji": "🍎",
      "value": "feat"
    },
    "fix": {
      "description": "버그 수정",
      "emoji": "🐛",
      "value": "fix"
    },
    "refactor": {
      "description": "성능 개선, 리팩토링",
      "emoji": "🍱",
      "value": "refactor"
    },
    "release": {
      "description": "Create a release commit",
      "emoji": "🏹",
      "value": "release"
    },
    "style": {
      "description": "코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등)",
      "emoji": "💄",
      "value": "style"
    },
    "test": {
      "description": "테스트 코드",
      "emoji": "🧃",
      "value": "test"
    },
    "build": {
      "description": "시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)",
      "emoji": "🌴",
      "value": "build"
    }
  }
};
