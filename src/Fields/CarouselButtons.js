import { GrNext, GrPrevious } from "react-icons/gr";

export const SamplePrevArrow = (props) => {
     const { className, onClick } = props;
     return (
          <div onClick={onClick} className={`arrow ${className}`} >
               <GrPrevious class="arrows" style={{ color: "white" }} />
          </div>
     )
}

export function SampleNextArrow(props) {
     const { className, onClick } = props;
     return (
          <div onClick={onClick} className={`arrow ${className}`} >
               <GrNext class="arrows" style={{ color: "white" }} />
          </div>
     )
}