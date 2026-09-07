async function loadCourseDetails() {

    const courseContent =
        document.getElementById("courseContent");

    const outcomesContainer =
        document.getElementById("outcomesContainer");

    const grammarContainer =
        document.getElementById("grammarContainer");

    const vocabularyContainer =
        document.getElementById("vocabularyContainer");

    const ctaContainer =
        document.getElementById("ctaContainer");


    // Get the level from URL

    const params =
        new URLSearchParams(window.location.search);

    const level =
        params.get("level");


    // If no level is provided

    if (!level) {

        courseContent.innerHTML = `

            <div class="error">

                <h2>
                    Course not found
                </h2>

                <p>
                    Please select a course from the courses page.
                </p>

                <a
                    href="../index.html#courses"
                    class="btn btn-primary"
                >
                    View Courses
                </a>

            </div>

        `;

        return;

    }


    try {

        // Load course database

        const response =
            await fetch("../data/courses.json");


        const data =
            await response.json();


        // Find selected course

        const course =
            data.courses.find(
                item => item.level === level.toUpperCase()
            );


        // Course doesn't exist

        if (!course) {

            courseContent.innerHTML = `

                <div class="error">

                    <h2>
                        Course not found
                    </h2>

                    <a
                        href="../index.html#courses"
                        class="btn btn-primary"
                    >
                        Back to Courses
                    </a>

                </div>

            `;

            return;

        }


        // Update browser title

        document.title =
            `Lern Sprache | ${course.title}`;


        // =========================
        // COURSE HERO
        // =========================

        courseContent.innerHTML = `

            <div class="course-level-large">

                ${course.level}

            </div>


            <h1>
                ${course.title}
            </h1>


            <p class="course-title-bangla">

                ${course.banglaTitle}

            </p>


            <p class="course-detail-description">

                ${course.description}

            </p>


            <div class="course-detail-meta">

                <div>

                    <span>
                        Course Fee
                    </span>

                    <strong>
                        ${course.price}
                    </strong>

                </div>


                <div>

                    <span>
                        Duration
                    </span>

                    <strong>
                        ${course.duration}
                    </strong>

                </div>

            </div>

        `;


        // =========================
        // LEARNING OUTCOMES
        // =========================

        const outcomes = [

            {
                icon: "🗣️",
                german: "Sprechen",
                english: "Speaking",
                text: course.speaking
            },

            {
                icon: "✍️",
                german: "Schreiben",
                english: "Writing",
                text: course.writing
            },

            {
                icon: "🎧",
                german: "Hören",
                english: "Listening",
                text: course.listening
            },

            {
                icon: "📖",
                german: "Lesen",
                english: "Reading",
                text: course.reading
            }

        ];


        outcomesContainer.innerHTML = "";


        outcomes.forEach(outcome => {

            const card =
                document.createElement("div");


            card.className =
                "outcome-card";


            card.innerHTML = `

                <div class="outcome-icon">

                    ${outcome.icon}

                </div>


                <h3>

                    ${outcome.german}

                </h3>


                <span class="outcome-english">

                    ${outcome.english}

                </span>


                <p>

                    ${outcome.text}

                </p>

            `;


            outcomesContainer.appendChild(card);

        });


        // =========================
        // GRAMMAR
        // =========================

        grammarContainer.innerHTML = `

            <div class="grammar-icon">
                📐
            </div>

            <div>

                <h3>
                    Grammatik
                </h3>

                <p>
                    ${course.grammar}
                </p>

            </div>

        `;


        // =========================
        // VOCABULARY
        // =========================

        vocabularyContainer.innerHTML = `

            <div class="vocabulary-icon">
                🧠
            </div>

            <div>

                <h3>
                    Wortschatz
                </h3>

                <p>
                    ${course.vocabulary}
                </p>

            </div>

        `;


        // =========================
        // CTA
        // =========================

        if (course.status === "available") {

            ctaContainer.innerHTML = `

                <div class="course-cta-content">

                    <span class="section-label">
                        Start Learning
                    </span>

                    <h2>
                        Ready to start ${course.level}?
                    </h2>

                    <p>
                        Begin your German learning journey
                        with Lern Sprache.
                    </p>


                    <div class="cta-price">

                        ${course.price}

                    </div>


                    <a
                        href="#"
                        class="btn btn-primary"
                    >
                        Enroll Now
                    </a>

                </div>

            `;

        }

        else {

            ctaContainer.innerHTML = `

                <div class="course-cta-content">

                    <span class="section-label">
                        Coming Soon
                    </span>

                    <h2>
                        ${course.title}
                    </h2>

                    <p>
                        This course will be available soon.
                    </p>

                    <button
                        class="btn btn-disabled"
                        disabled
                    >
                        Coming Soon
                    </button>

                </div>

            `;

        }

    }

    catch (error) {

        console.error(
            "Course loading error:",
            error
        );


        courseContent.innerHTML = `

            <div class="error">

                <h2>
                    Something went wrong.
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}


loadCourseDetails();
