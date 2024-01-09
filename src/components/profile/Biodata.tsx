import FormName from "./FormName";
import FormEmail from "./FormEmail";
import FormGender from "./FormGender";
import FormBirthDate from "./FormBirthdate";
import moment from "moment";

interface IData {
  data: {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    gender: string;
    phone_number: string;
  };
}

const Biodata: React.FC<IData> = ({ data }) => {
  const constant = [
    { value: "male", text: "Laki-laki" },
    { value: "female", text: "Perempuan" },
  ];
  const selectGender = constant.filter((e) => e.value === data.gender)[0];

  return (
    <div className="text-xl space-y-12 text-slate-700">
      <div>
        <p className="font-medium">Nama Lengkap</p>
        <div className="flex justify-between items-center">
          <p className="font-thin">{data.name}</p>
          <FormName name={data.name} />
        </div>
      </div>

      <div>
        <p className="font-medium">Alamat Email</p>
        <div className="flex justify-between items-center">
          <p className="font-thin">{data.email}</p>
          <FormEmail email={data.email} password={data.password} />
        </div>
      </div>

      <div>
        <p className="font-medium">Jenis Kelamin</p>
        <div className="flex justify-between items-center">
          <p className="font-thin">{data.gender ? selectGender.text : "Tidak ada"}</p>
          <FormGender gender={data.gender} />
        </div>
      </div>

      <div>
        <p className="font-medium">Tanggal Lahir</p>
        <div className="flex justify-between items-center">
          {data.birthdate ? (
            <p className="font-thin">{moment(data.birthdate).locale("id").format("LL")}</p>
          ) : (
            <span className="font-thin">Tidak diketahui</span>
          )}
          <FormBirthDate birthdate={data.birthdate} />
        </div>
      </div>
    </div>
  );
};

export default Biodata;
