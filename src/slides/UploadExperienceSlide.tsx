import { DeckVideo } from '../components/DeckVideo'

export function UploadExperienceSlide() {
  return (
    <article className="upload-experience-slide" data-node-id="upload-experience">
      <DeckVideo
        className="upload-experience-slide__video"
        mp4="/media/upload/upload.mp4"
        poster="/media/upload/upload-poster.jpg"
        webm="/media/upload/upload.webm"
      />
      <h2 className="upload-experience-slide__headline">Upload flow</h2>
    </article>
  )
}
