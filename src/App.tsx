import { useState } from 'react';
import './styles/index.css';
import { VideoThumbnailExtractor } from './components/VideoThumbnailExtractor';
import * as styles from './styles/example.css';
import { Button } from './components/common';
import { type ThumbnailData } from './types';

function App() {
  const [isModal, setIsModal] = useState<boolean>(true);
  const [exampleData, setExampleData] = useState<[ThumbnailData[]][]>([]);

  const handleOpenModal = () => setIsModal(true);
  const handleCloseModal = () => setIsModal(false);

  const handleSubmit = (thumbnails: ThumbnailData[]) => {
    setExampleData([...exampleData, [thumbnails]]);
  };

  return (
    <div className={styles.exampleWrap}>
      <Button onClick={handleOpenModal}>동영상 첨부</Button>

      <ul>
        {exampleData.map((example, index) => (
          <li key={index}>
            {index} _ {JSON.stringify(example)}
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
