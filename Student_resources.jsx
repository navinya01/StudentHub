import React, { useMemo, useState } from "react";
import "../App.css";

function StudentResources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const resources = [
    {
      id: 1,
      title: "Data Structures Notes",
      subject: "Data Structures",
      type: "NOTES",
      description:
        "Important concepts, algorithms, stacks, queues, trees and exam-oriented topics.",
      icon: "🌳",
      category: "Notes",
      link: "https://www.geeksforgeeks.org/data-structures/",
    },

    {
      id: 2,
      title: "DBMS Complete Notes",
      subject: "DBMS",
      type: "NOTES",
      description:
        "Database architecture, SQL, ER model, normalization and important DBMS concepts.",
      icon: "🗄️",
      category: "Notes",
      link: "https://www.geeksforgeeks.org/dbms/",
    },

    {
      id: 3,
      title: "Python Programming",
      subject: "Python",
      type: "VIDEO",
      description:
        "Learn Python basics, variables, functions, lists, loops and programming concepts.",
      icon: "🐍",
      category: "Videos",
      link: "https://www.youtube.com/results?search_query=python+programming+for+beginners",
    },

    {
      id: 4,
      title: "Operating System Notes",
      subject: "Operating System",
      type: "NOTES",
      description:
        "Processes, CPU scheduling, memory management, deadlocks and file systems.",
      icon: "💻",
      category: "Notes",
      link: "https://www.geeksforgeeks.org/operating-systems/",
    },

    {
      id: 5,
      title: "Computer Networks",
      subject: "Computer Networks",
      type: "NOTES",
      description:
        "Networking fundamentals, protocols, OSI model and communication concepts.",
      icon: "🌐",
      category: "Notes",
      link: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    },

    {
      id: 6,
      title: "Mathematics Practice",
      subject: "Mathematics",
      type: "PRACTICE",
      description:
        "Important formulas, examples and practice questions for mathematics.",
      icon: "📐",
      category: "Practice",
      link: "https://www.khanacademy.org/math",
    },
  ];

  const categories = [
    "All",
    "Notes",
    "Videos",
    "Practice",
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        resource.subject
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        resource.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const openResource = (resource) => {
    window.open(
      resource.link,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="page-container resources-page">

      {/* HEADER */}

      <div className="inner-page-header resources-header">

        <div>
          <span className="page-eyebrow">
            LEARNING CENTER
          </span>

          <h1>Student Resources</h1>

          <p>
            Explore study materials, notes and practice
            resources in one place.
          </p>
        </div>

        <div className="large-page-icon">
          📚
        </div>

      </div>


      {/* SEARCH */}

      <div className="resource-toolbar">

        <div className="resource-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search resources or subjects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}

        </div>


        <div className="resource-filters">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "resource-filter active"
                  : "resource-filter"
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </div>


      {/* SUMMARY */}

      <div className="resource-summary">

        <div>
          <strong>
            {filteredResources.length}
          </strong>

          <span>
            Resources Available
          </span>
        </div>

        <div>
          <strong>
            {
              resources.filter(
                (item) =>
                  item.category === "Notes"
              ).length
            }
          </strong>

          <span>
            Study Notes
          </span>
        </div>

        <div>
          <strong>
            {
              resources.filter(
                (item) =>
                  item.category === "Videos"
              ).length
            }
          </strong>

          <span>
            Video Resources
          </span>
        </div>

        <div>
          <strong>
            {
              resources.filter(
                (item) =>
                  item.category === "Practice"
              ).length
            }
          </strong>

          <span>
            Practice Sets
          </span>
        </div>

      </div>


      {/* RESOURCE GRID */}

      {filteredResources.length === 0 ? (

        <div className="modern-panel resource-empty">

          <div className="resource-empty-icon">
            🔍
          </div>

          <h3>
            No resources found
          </h3>

          <p>
            Try another search term or category.
          </p>

          <button
            className="modern-submit"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="resource-grid">

          {filteredResources.map(
            (resource) => (

              <div
                className="resource-card"
                key={resource.id}
              >

                <div className="resource-card-top">

                  <div className="resource-icon">
                    {resource.icon}
                  </div>

                  <span
                    className={`resource-type ${resource.category.toLowerCase()}`}
                  >
                    {resource.type}
                  </span>

                </div>


                <div className="resource-card-content">

                  <span className="resource-subject">
                    {resource.subject}
                  </span>

                  <h3>
                    {resource.title}
                  </h3>

                  <p>
                    {resource.description}
                  </p>

                </div>


                <div className="resource-card-footer">

                  <span>
                    {resource.category}
                  </span>

                  <button
                    onClick={() =>
                      openResource(resource)
                    }
                  >
                    Open Resource →
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {/* STUDY TIP */}

      <div className="resource-tip">

        <div className="resource-tip-icon">
          💡
        </div>

        <div>

          <span>
            STUDY TIP
          </span>

          <h3>
            Consistent learning beats last-minute studying.
          </h3>

          <p>
            Spend a little time every day reviewing your
            subjects and practicing important concepts.
          </p>

        </div>

      </div>

    </div>
  );
}

export default StudentResources;