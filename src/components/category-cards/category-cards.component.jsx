import CategoryCard from "../category-card/category-card.component";
import "./category-cards.styles.scss";
const CategoryCards = ({ cards }) => {
  return (
    <div className='category-cards-container'>
      {cards.map(({ title, desc, imgUrl, key }) => (
        <CategoryCard
          key={key}
          title={title}
          desc={desc}
          imgUrl={imgUrl}
        />
      ))}
    </div>
  );
};

export default CategoryCards;
