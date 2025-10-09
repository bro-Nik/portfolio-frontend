import Header from './components/Header';
import { ROUTES } from '/app/src/constants/routes';
import heroBanner from './images/hero-banner.jpg';

const LandingPage = () => {
  return (
    <>
      <main className="d-flex flex-column w-100">
        <section className="d-flex flex-column min-vh-100">
          <Header />

          <section className="d-flex container flex-column-reverse justify-content-center flex-lg-row align-items-center h-100">

            <div className="col-12 col-lg-5 m-5 m-lg-0">
              <div className="d-flex flex-column">
                <h2 className="text-uppercase mb-5 fw-bold display-4" style={{color: '#e5bb15'}}>
                  Отслеживай активы в одном месте
                </h2>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="d-flex flex-column justify-content-center">
                <img src={heroBanner} />
              </div>
            </div>

          </section>

        </section>

        <section className="bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
              <div className="col d-flex flex-column align-items-start gap-2">
                <h2 className="fw-bold text-body-emphasis">Portfolios помогает не запутаться в инвестициях</h2>  
                <p className="text-body-secondary"><b>Portfolios</b> позволяет вести учет по многим активам в одном личном кабинете, что позволяет ничего не растерять и не забыть.</p>
              </div>

              <div className="col">
                <div className="row row-cols-1 row-cols-sm-2 g-4">
                  <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small p-1 d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-currency-bitcoin text-white" viewBox="0 0 16 16"><path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927z"/></svg>
                    </div>
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Криптовалюта</h4>
                    <p className="text-body-secondary">Ведение криптовалютных портфелей с различнами стратегиями управления.</p>
                  </div>

                  <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small p-1 d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-apple text-white" viewBox="0 0 16 16"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/></svg>
                    </div>
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Акции</h4>
                    <p className="text-body-secondary">Ведение портфелей с акциями разделенных по своему усмотрению.</p>
                  </div>

                  <div className="col d-flex flex-column gap-2">
                    <div className="feature-icon-small p-1 d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-piggy-bank text-white" viewBox="0 0 16 16"><path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.138-1.496A6.6 6.6 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.6 7.6 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962"/><path fillRule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595M2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.6 6.6 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.65 4.65 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393m12.621-.857a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199"/></svg>
                    </div>
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Офлайн активы</h4>
                    <p className="text-body-secondary">Ведение портфелей с офлайн активами.</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div className="feature col">
              <div className="feature-icon p-2 rounded-3 d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-briefcase-fill text-white" viewBox="0 0 16 16"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/><path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/></svg>
              </div>
              <h3 className="fs-2 text-body-emphasis">Портфели</h3>
              <p>Управление портфелями с цифровыми и другими активами. Собирайте портфели по вашей собственной стратегии, цели или другому принципу.</p>
              <ul className="fw-light">
                <li>неограниченное количество портфелей</li>
                <li>процентное соотношение между портфелями и активами</li>
                <li>уведомления по достижению цены</li>
                <li>история транзакций</li>
              </ul>
            </div>
            <div className="feature col">
              <div className="feature-icon p-2 rounded-3 d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-wallet-fill text-white" viewBox="0 0 16 16"><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542s.987-.254 1.194-.542C9.42 6.644 9.5 6.253 9.5 6a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2z"/><path d="M16 6.5h-5.551a2.7 2.7 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5s-1.613-.412-2.006-.958A2.7 2.7 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5z"/></svg>
              </div>
              <h3 className="fs-2 text-body-emphasis">Кошельки</h3>
              <p>Удобное управление всеми кошельками, где хранятся активы. Вы можете вести столько кошельков, сколько необходимо, например, сколько у вас есть в реальности и понимать, где именно лежит интересующий актив и в каком количестве.</p>
              <ul className="fw-light">
                <li>неограниченное количество кошельков</li>
                <li>список активов в кошельке</li>
                <li>статистика по свободным средствам</li>
                <li>статистика по средствам, зарезервированным на ордеры</li>
              </ul>
            </div>
            <div className="feature col">
              <div className="feature-icon p-2 rounded-3 d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-star-fill text-white" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
              </div>
              <h3 className="fs-2 text-body-emphasis">Списки отслеживания</h3>
              <p>Не теряйте и отслеживайте интересующие вас активы.</p>
              <ul className="fw-light">
                <li>список избранных активов</li>
                <li>уведомления по достижению цены</li>
              </ul>
            </div>
          </div>
        </section>
        <footer className="d-flex text-white footer mt-auto py-3 bg-dark bg-gradient" style={{textAlign: 'center'}}>
          <span className="m-auto">2025 Portfolios</span>
        </footer>
      </main>

    </>
  );

};

export default LandingPage;
