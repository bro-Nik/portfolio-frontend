import React, { useState, useEffect } from 'react';
import { useModalStore } from '/app/src/stores/modalStore';
import { portfolioApi } from '../api/portfolioApi';
import { useToastStore } from '/app/src/stores/toastStore';

const PortfolioForm = () => {
  const { modalProps, closeModal } = useModalStore();
  const { 
    portfolio = null,
    title = portfolio ? 'Редактировать портфель' : 'Добавить портфель',
    submitText = portfolio ? 'Сохранить изменения' : 'Добавить портфель'
  } = modalProps;

  const [formData, setFormData] = useState({
    name: '',
    market: 'crypto',
    // percent: '',
    comment: ''
  });
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast, clearToasts } = useToastStore();

  useEffect(() => {
    setFormData({
      name: portfolio?.name || '',
      market: portfolio?.market || 'crypto',
      // percent: portfolio?.percent || '',
      comment: portfolio?.comment || ''
    });
    setShowMore(!!(portfolio?.percent || portfolio?.comment));
  }, [portfolio]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    const submitData = {
      ...formData,
      percent: formData.percent ? parseFloat(formData.percent) : null,
      // Добавляем ID если редактируем
      ...(portfolio && { id: portfolio.id })
    };

    const result = await portfolioApi.savePortfolio(submitData);
    if (result.success) {
      addToast('Портфель создан', 'success');
    } else {
      addToast(result.error, 'error');
    }
    // if (result.success) {
    //   const portfoliosData = result.data.portfolios || [];
    //   setPortfolios(portfoliosData);
    //   addAssets(portfoliosData);
    // }

    closeModal();
  };

  return (
    <>
      <div className="modal-header">
        <h1 className="modal-title fs-3">{title}</h1>
        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close" />
      </div>

      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label h7">Название</label>
                <input type="text" className="form-control rounded-3 focus" name="name" value={formData.name} onChange={handleInputChange} required autoFocus />
              </div>
            </div>

            <div className="col-md-6 mb-1">
              <label className="form-label h7">Рынок</label>
              <select name="market" className="form-select" value={formData.market} onChange={handleInputChange} required >
                <option value="crypto">Крипто</option>
                <option value="stocks">Акции</option>
                {/* <option value="other">Другое</option> */}
              </select>
            </div>

            <div className="col-12">
              <span className="mb-3 text-primary show-more" onClick={() => setShowMore(!showMore)} >
                {showMore ? '− Скрыть' : '+ Еще'}
              </span>
            </div>

            {showMore && (
              <div className="show-more-content">
                {/* <div className="col-12"> */}
                {/*   <div className="mb-1"> */}
                {/*     <label className="form-label h7">Планируемый процент портфеля</label> */}
                {/*     <div className="input-group"> */}
                {/*       <span className="input-prefix">%</span> */}
                {/*       <input type="number" step="0.01" min="0" max="100" className="form-control rounded-3" placeholder="0,00" name="percent" */}
                {/*         value={formData.percent} */}
                {/*         onChange={handleInputChange} */}
                {/*       /> */}
                {/*     </div> */}
                {/*   </div> */}
                {/* </div> */}

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label h7">Комментарий</label>
                    <textarea className="form-control" name="comment" value={formData.comment} onChange={handleInputChange} rows="auto" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary rounded-3 flex-fill" >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PortfolioForm;
