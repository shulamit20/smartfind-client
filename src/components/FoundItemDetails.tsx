import type { FoundItem } from "../types/foundItem";

type FoundItemDetailsProps = {
  item: FoundItem;
};
const FoundItemDetails=({item}:FoundItemDetailsProps)=>{
return (
<div className="found-item-details card item-card">
      <h1 className="font-display text-[30px] font-bold leading-[1.15] tracking-tight">{item.title}</h1>
      <p className="mt-3 text-muted">{item.description}</p>
      <p className="item-tags">
        {item.category.name} · {item.color.name} · {item.location.name}
      </p>
      <p className="card-meta mt-5 border-t border-line pt-4">נמצא בתאריך: {new Date(item.foundDate).toLocaleDateString("he-IL")}</p>

    </div>

);}
export default FoundItemDetails
