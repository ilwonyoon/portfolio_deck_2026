export function UploadExperienceSlide() {
  return (
    <article className="upload-experience-slide" data-node-id="upload-experience">
      <video
        autoPlay
        className="upload-experience-slide__video"
        loop
        muted
        playsInline
      >
        <source src="/media/upload/upload.webm" type="video/webm" />
        <source src="/media/upload/upload.mp4" type="video/mp4" />
      </video>
      <h2 className="upload-experience-slide__headline">
        Enhance upload experience
        <br />
        (add product tags)
      </h2>
    </article>
  )
}
