# 📹 react-video-thumbnailer

![이미지 설명](public/example.png)

비디오 파일로부터 썸네일을 추출하는 React 컴포넌트입니다.  
**업로드 → 썸네일 추출 → 선택 및 전달** 과정을 모달로 제공합니다.

> ✅ React + TypeScript + Vite 기반  
> ✅ Drag & Drop 지원  
> ✅ 썸네일 추출 개수 제한 가능  
> ✅ 선택된 썸네일을 외부로 전달

---

## 📦 설치

```bash
npm install react-video-thumbnailer
# 또는
yarn add react-video-thumbnailer
```

---

## 🚀 사용 방법

```typescript
import { useState } from 'react';
// style
import 'react-video-thumbnailer/style.css';
// component
import { VideoThumbnailExtractor } from 'react-video-thumbnailer';
// type
import type { ThumbnailData } from 'react-video-thumbnailer/types';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>썸네일 추출하기</button>
      <VideoThumbnailExtractor
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          setThumbnails(data);
          setIsOpen(false);
        }}
        maxThumbnails={4}
      />
    </>
  );
}

```

---

## ⚙️ Props

### `<VideoThumbnailExtractor />`

| Prop            | Type                                    | Required | Description                            |
| --------------- | --------------------------------------- | -------- | -------------------------------------- |
| `isOpen`        | `boolean`                               | ✅       | 모달 열림 여부                         |
| `onClose`       | `() => void`                            | ✅       | 모달 닫기 콜백                         |
| `onSubmit`      | `(thumbnails: ThumbnailData[]) => void` | ✅       | 썸네일 선택 후 제출 콜백               |
| `maxThumbnails` | `number`                                | ❌       | 최대 추출 가능한 썸네일 개수 (기본: 4) |

---

## 🛠 개발 환경

- Node 22.X
- React 19
- TypeScript
- Vite
- vanilla-extract (스타일링)

---

## 🧪 예제

![이미지 설명](public/example02.png)
`yarn dev` 를 사용하여 아래와 같은 예제를 실행해볼 수 있습니다.
