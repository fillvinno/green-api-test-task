import styles from './AuthPage.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {authSlice} from "../../store/reducers/authSlice.ts";
import {useNavigate} from "react-router-dom";

type Inputs = {
  idInstance: number
  apiTokenInstance: string
}

const AuthPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const {setAuth, setInstance} = authSlice.actions
  const dispatch = useAppDispatch()
  const navigate = useNavigate()



  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setAuth(true))
    dispatch(setInstance({apiTokenInstance: data.apiTokenInstance, idInstance: data.idInstance}))

    localStorage.setItem('instance', JSON.stringify(data))

    navigate("/chat")
  }

  return (
    <div className={styles.wrap}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>GREEN-API</h3>
        <div className={styles.inputs}>
          <span className={styles.error}>{errors.idInstance && 'Обязательное поле'}</span>
          <input
            type='text'
            className={styles.input}
            placeholder='Введите idInstance'
            {...register("idInstance", {required: true})}
          />
          <span className={styles.error}>{errors.apiTokenInstance && 'Обязательное поле'}</span>
          <input
            type='text'
            className={styles.input}
            placeholder='Введите apiTokenInstance'
            {...register("apiTokenInstance", {required: true})}
          />
          <button
            className={styles.btn}
          >
            Авторизоваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;

