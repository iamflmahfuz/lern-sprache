async function loadCourses() {

    const container = document.getElementById("coursesContainer");

    try {

        const response = await fetch("data/courses.json");

        const data = await response.json();

        container.innerHTML = "";

        data.courses.forEach(course => {

            const card = document.createElement("div");

            card.className = "course-card";

            if (course.status === "coming-soon") {
                card.classList.add("coming-soon");
            }

            card.innerHTML = `

                <div class="course-top">

                    <span class="course-level">
                        ${course.level}
                    </span>

                    ${
                        course.status === "coming-soon"
                        ? `<span class="coming-badge">
                            Coming Soon
                           </span>`
                        : ""
                    }

                </div>

                <h3>${course.title}</h3>

                <p class="course-bangla">
                    ${course.banglaTitle}
                </p>

                <p class="course-description">
                    ${course.description}
                </p>

                <div class="course-info">

                    <div>
                        <small>Course Fee</small>
                        <strong>${course.price}</strong>
                    </div>

                    <div>
                        <small>Duration</small>
                        <strong>${course.duration}</strong>
                    </div>

                </div>

                ${
                    course.status === "coming-soon"

                    ?

                    `<button class="btn btn-disabled" disabled>
                        Coming Soon
                    </button>`

                    :

                    `<a
                        href="courses/course.html?level=${course.level}"
                        class="btn btn-primary course-btn"
                    >
                        View Course
                    </a>`
                }

            `;

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="error">
                Unable to load courses.
            </p>
        `;

    }

}

loadCourses();
