function PrevAndNextButtons({ onPrevious, onNext, isFormComplete = null }) {
    return (
        <div className="button-wrapper">
            {' '}
            <button className="previous-button button" onClick={onPrevious}>
                戻る
            </button>
            <button
                className="next-button button"
                onClick={onNext}
                disabled={!isFormComplete}
            >
                次へ
            </button>
        </div>
    );
}

export default PrevAndNextButtons;
