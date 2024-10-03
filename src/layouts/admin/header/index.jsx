import React, { useState } from "react";
import "../admin.css";
import { theme } from "antd";
export default function HeaderAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <div className="header_content">
        {/* search */}
        <form className="form">
          <button>
            <svg
              width={17}
              height={16}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                strokeWidth="1.333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input
            className="input"
            placeholder="Type your text"
            required=""
            type="text"
          />
          <button className="reset" type="reset">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </form>

        {/* logout */}
        <label class="popup">
          <input type="checkbox" />
          <div tabindex="0" class="burger">
            <i class="bx bx-user"></i>
          </div>
          <nav class="popup-window">
            <ul>
              <li>
                <button>
                  <span>Edit profile</span>
                  <i class="bx bxs-user"></i>
                </button>
              </li>
              <li>
                <button>
                  <span>Change password</span>
                  <i class="bx bx-key"></i>
                </button>
              </li>
              <li>
                <button>
                  <span>To do list</span>
                  <i class="bx bx-notepad"></i>
                </button>
              </li>
              <span className="line_logout"></span>
              <li>
                <button>
                  <i class="bx bx-log-out"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </label>
      </div>
    </>
  );
}
