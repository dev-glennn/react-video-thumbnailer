import { useState } from 'react';
import './styles/index.css';
import { VideoThumbnailExtractor } from './components/VideoThumbnailExtractor';
import * as styles from './styles/example.css';
import { Button } from './components/common';
import { type ThumbnailData } from './types';
import { ThumbnailGrid } from './components/VideoThumbnailExtractor/ThumbnailExtract/ThumbnailGrid';

function App() {
  const [isModal, setIsModal] = useState<boolean>(true);
  const [exampleData, setExampleData] = useState<ThumbnailData[][]>([]);

  const handleOpenModal = () => setIsModal(true);
  const handleCloseModal = () => setIsModal(false);

  const handleSubmit = (thumbnails: ThumbnailData[]) => {
    setExampleData([thumbnails, ...exampleData]);
  };

  return (
    <div className={styles.exampleWrap}>
      <Button onClick={handleOpenModal}>동영상 첨부</Button>

      <ul className={styles.exampleImageWrap}>
        {exampleData.map((example, index) => (
          <li key={index} className={styles.imageListItem}>
            <span className={styles.imageIndex}>{index + 1}번째</span>
            <div className={styles.imageGridWrap}>
              <ThumbnailGrid thumbnails={example} />
            </div>
          </li>
        ))}
      </ul>

      <VideoThumbnailExtractor
        isOpen={isModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
