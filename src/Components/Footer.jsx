import React from 'react'
import '../Style/Footer.css'
export default function Footer() {
  return (
    <div>
      <footer className="footer">
    <div className="container">
        <div className="brand-section">
            <a href="#" className="brand-link">
                <div className="brand-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="brand-svg">
                        <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                    </svg>
                </div>
                <span className="brand-name">Brand name</span>
            </a>
        </div>
        <div className="links-section">
            <div className="link-group">
                <h3 className="link-title">Product</h3>
                <ul className="link-list">
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Integrations</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div className="link-group">
                <h3 className="link-title">Company</h3>
                <ul className="link-list">
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
            <div className="link-group">
                <h3 className="link-title">Developers</h3>
                <ul className="link-list">
                    <li><a href="#">Public API</a></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Guides</a></li>
                </ul>
            </div>
            <div className="link-group">
                <div className="link-title">Social media</div>
                <div className="social-links">
                    <a href="#" title="Facebook" className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="social-svg">
                            <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                        </svg>
                    </a>
                    <a href="#" title="Twitter" className="social-link">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="social-svg">
                            <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                        </svg>
                    </a>
                    <a href="#" title="Instagram" className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="social-svg">
                            <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.749 0.291 1.281 0.635 1.844 1.197 0.557 0.557 0.901 1.099 1.197 1.844 0.22 0.563 0.48 1.411 0.553 2.968 0.073 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.093 6.469c-0.073 1.563-0.333 2.405-0.553 2.968-0.292 0.749-0.635 1.281-1.197 1.844-0.557 0.557-1.099 0.901-1.844 1.197-0.563 0.22-1.411 0.48-2.968 0.553-1.688 0.073-2.199 0.093-6.469 0.093s-4.781-0.021-6.469-0.093c-1.563-0.073-2.405-0.333-2.968-0.553-0.749-0.292-1.281-0.635-1.844-1.197-0.557-0.557-0.901-1.099-1.197-1.844-0.22-0.563-0.48-1.411-0.553-2.968-0.073-1.688-0.093-2.199-0.093-6.469s0.021-4.781 0.093-6.469c0.073-1.563 0.333-2.405 0.553-2.968 0.291-0.749 0.635-1.281 1.197-1.844 0.557-0.557 1.099-0.901 1.844-1.197 0.563-0.22 1.411-0.48 2.968-0.553 1.688-0.073 2.199-0.093 6.469-0.093zM16 7.781c-4.537 0-8.219 3.677-8.219 8.219 0 4.537 3.677 8.219 8.219 8.219 4.537 0 8.219-3.677 8.219-8.219 0-4.537-3.677-8.219-8.219-8.219zM16 22.688c-3.703 0-6.688-2.984-6.688-6.688s2.984-6.688 6.688-6.688c3.703 0 6.688 2.984 6.688 6.688s-2.984 6.688-6.688 6.688zM24.516 6.479c-1.061 0-1.922 0.865-1.922 1.922s0.865 1.922 1.922 1.922c1.057 0 1.922-0.865 1.922-1.922s-0.865-1.922-1.922-1.922z"></path>
                        </svg>
                    </a>
                    <a href="#" title="LinkedIn" className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="social-svg">
                            <path d="M12 12h5.535v2.612h0.079c0.771-1.461 2.656-3 5.471-3 5.85 0 6.914 3.847 6.914 8.846v10.154h-6v-9c0-2.143-0.039-4.898-2.979-4.898-2.979 0-3.435 2.318-3.435 4.733v9.165h-6v-18zM0 12h6v18h-6v-18zM3.18 0c-1.925 0-3.18 1.255-3.18 2.897 0 1.615 1.213 2.898 3.109 2.898h0.037c1.966 0 3.18-1.283 3.18-2.898-0.037-1.642-1.213-2.897-3.145-2.897z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
    </div>
  )
}
