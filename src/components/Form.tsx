import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
const Form = ({ dispatch, state }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state?.activeId) {
      const selectedActivity = state.activities.filter(
        (activity) => activity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state?.activeId]);
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value,
    });
  };

  // con use memo
  const isValidActivity = useMemo(() => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  }, [activity?.calories, activity?.name]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidActivity) return;
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="category"
          className="font-bold"
        >
          Categoria:
        </label>
        <select
          name="category"
          id="category"
          value={activity.category}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 pag-3">
        <label
          htmlFor="name"
          className="font-bold"
        >
          Actividad
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Categorias. ej. 300 o 500"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 pag-3">
        <label
          htmlFor="calories"
          className="font-bold"
        >
          Calorías:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Categorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:gb-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer transition-colors disabled:opacity-10"
        value={` ${state?.activeId ? "Actualizar" : "Guardar"}  ${
          activity?.category == 1 ? "Comida" : "Ejercicio"
        }`}
        disabled={!isValidActivity}
      />
    </form>
  );
};

export default Form;
