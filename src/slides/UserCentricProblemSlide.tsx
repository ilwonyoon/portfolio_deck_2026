const PROFILE_COUNT = 200
const PROFILE_TOTAL = 200

const profileImage = (index: number) =>
  `/media/user-profiles/profile-${String((index % PROFILE_COUNT) + 1).padStart(3, '0')}.jpg`

export function UserCentricProblemSlide() {
  return (
    <article className="user-centric-problem-slide">
      <div className="user-centric-problem-slide__copy">
        <h1 className="user-centric-problem-slide__question">
          Everyone says “user-centric.”
          <br />
          But who is the user?
        </h1>

        <div className="user-centric-problem-slide__list">
          <p className="user-centric-problem-slide__eyebrow">
            When teams don't agree
          </p>

          <ol className="user-centric-problem-slide__items">
            <li>
              <span>01</span>
              <p>Different people in mind</p>
            </li>
            <li>
              <span>02</span>
              <p>Decisions pull in different directions</p>
            </li>
            <li>
              <span>03</span>
              <p>Nothing moves together</p>
            </li>
          </ol>
        </div>
      </div>

      <div
        aria-label="A grid of many possible target user profiles"
        className="user-centric-problem-slide__visual"
      >
        {Array.from({ length: PROFILE_TOTAL }, (_, index) => (
          <img
            alt=""
            aria-hidden="true"
            className="user-centric-problem-slide__avatar"
            key={index}
            loading="eager"
            src={profileImage(index)}
          />
        ))}
      </div>
    </article>
  )
}
