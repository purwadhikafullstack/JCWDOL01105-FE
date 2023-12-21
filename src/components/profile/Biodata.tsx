import FormName from "./FormName";
import FormEmail from "./FormEmail";
import FormGender from "./FormGender";
import FormBirthDate from "./FormBirthdate";
import moment from "moment";

interface IData {
  data: {
    name: string;
    email: string;
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
    <div>
      <div className="mb-6">
        <p className="text-lg font-medium">Nama Lengkap</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-thin">{data.name}</p>
          <FormName name={data.name} />
        </div>
      </div>

      <div className="my-6">
        <p className="text-lg font-medium">Alamat Email</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-thin">{data.email}</p>
          <FormEmail email={data.email} />
        </div>
      </div>

      <div className="my-6">
        <p className="text-lg font-medium">Jenis Kelamin</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-thin">{data.gender ? selectGender.text : "Tidak ada"}</p>
          <FormGender gender={data.gender} />
        </div>
      </div>

      <div className="my-6">
        <p className="text-lg font-medium">Tanggal Lahir</p>
        <div className="flex justify-between items-center">
          {data.birthdate ? (
            <p className="text-lg font-thin">{moment(data.birthdate).locale("id").format("LL")}</p>
          ) : (
            <span className="text-lg font-thin">Tidak diketahui</span>
          )}
          <FormBirthDate birthdate={data.birthdate} />
        </div>
      </div>
    </div>
  );
};

export default Biodata;
