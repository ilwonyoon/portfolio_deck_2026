export function RoomPlannerProofSlide() {
  return (
    <article className="room-planner-proof-slide" data-node-id="6454:61671">
      <section className="room-planner-proof-slide__copy" data-node-id="6454:61672">
        <p>
          <span>Visualization builds confidence.</span>
          <span>Confidence drives actions (purchase).</span>
        </p>
        <p>
          <span>Room Planner proved it.</span>
          <span>30% bought on the same day.</span>
          <span>Platform average: 8 days.</span>
        </p>
      </section>

      <section className="room-planner-proof-slide__images" aria-label="Room Planner proof screens">
        <video
          autoPlay
          className="room-planner-proof-slide__image room-planner-proof-slide__image--planner"
          data-node-id="6460:61684"
          loop
          muted
          playsInline
          poster="/media/room-planner-proof/planner-phone.png"
          preload="metadata"
        >
          <source src="/media/room-planner-proof/planner-phone.webm" type="video/webm" />
          <source src="/media/room-planner-proof/planner-phone.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          className="room-planner-proof-slide__image room-planner-proof-slide__image--explore"
          data-node-id="6460:63446"
          loop
          muted
          playsInline
          poster="/media/room-planner-proof/explore-phone.png"
          preload="metadata"
        >
          <source src="/media/room-planner-proof/explore-phone.webm" type="video/webm" />
          <source src="/media/room-planner-proof/explore-phone.mp4" type="video/mp4" />
        </video>
      </section>
    </article>
  )
}
