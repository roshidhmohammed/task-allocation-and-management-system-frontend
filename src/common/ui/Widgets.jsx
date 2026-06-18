import { stats } from "../../constants/dashboardStats";
import useFetchTaskCategorizationByStatus from "../../hooks/useFetchTaskCategorizationByStatus";

const Widgets = () => {
  const {data}  =useFetchTaskCategorizationByStatus()


  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
  {stats.map((item) => (
    <div
      key={item.key}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
    >
      <h3
        className={`text-sm font-medium uppercase tracking-wide ${item.textColor}`}
      >
        {item.title}
      </h3>

      <p className={`mt-3 text-3xl font-bold ${item.textColor}`}>
        {data?.length>0 && data[0][item.key]}
      </p>
    </div>
  ))}
</div>
  )
}

export default Widgets