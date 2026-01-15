interface Props {
  title: string;
  value: number | string;
  bgColor?: string;
}

function ProductCard({ title, value, bgColor }: Props) {
  return (
    <div className={`card text-white mb-3 ${bgColor}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-2xl">{value}</p>
      </div>
    </div>
  );
}

export default ProductCard;
