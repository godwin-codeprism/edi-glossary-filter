import React from 'react';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Glossary />
    </React.Fragment>
  );
}

export default App;


class Header extends React.Component {


  render() {
    return (
      <div>
        <nav className="header">
          <h2> <i className="material-icons">library_books</i> NEMA FYA Glossary</h2>
        </nav>
      </div>
    )
  }
}

class Glossary extends React.Component {

  constructor() {
    super();
    this.state = {
      glossaryData: null,
      query: ''
    }
  }

  componentDidMount() {
    this.getFrameXML();
  }

  getFrameXML = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
        this.setState({ glossaryData: Array.from(xmlDoc.querySelectorAll('term')) });
      }
    };
    xhttp.open("GET", "glossary.xml", true);
    xhttp.send();

  }

  onChangeHandler(e) {
    this.setState({ query: e.currentTarget.value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-view view_1">
          <div className="main-view">
            <section className="container">
              <div className="box">
                <label htmlFor="query" className="material-input">
                  <input className="text-field" type="text" id="query" size="30" placeholder=" " onChange={this.onChangeHandler.bind(this)} />
                  <span className="input-label">Search for keywords</span>
                  <i className="input-underline"></i>
                </label>
                <div className="search">
                  <i className="material-icons">search</i>
                </div>
              </div>
            </section>
            <div className="list-container">
              <ul className="list-tabs">
                {
                  this.state.glossaryData && this.state.glossaryData.filter(term => (term.getAttribute('title').toLowerCase().includes(this.state.query.toLowerCase()) || term.textContent.toLowerCase().includes(this.state.query.toLowerCase()))).map((term, index) => {
                    return (
                      <li key={`${term.getAttribute('title')}_${index}`}>  <h2> {term.getAttribute('title')} </h2>
                        <p>{term.textContent}</p>
                      </li>
                    )

                  })
                }

              </ul>
            </div>

          </div>


        </div>
      </React.Fragment>
    )
  }
}
