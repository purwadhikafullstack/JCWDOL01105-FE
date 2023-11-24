import FormName from "./FormName";
import FormEmail from "./FormEmail";
import FormGender from "./FormGender";
import FormBirthDate from "./FormBirthdate";

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
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(data.birthdate) ? new Date(data.birthdate) : new Date().getTime();
  const birthdate = date.toLocaleString("en-ID", options);

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
          <p className="text-lg font-thin">{data.gender ? data.gender : "Tidak ada"}</p>
          <FormGender gender={data.gender} />
        </div>
      </div>

      <div className="my-6">
        <p className="text-lg font-medium">Tanggal Lahir</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-thin">{birthdate}</p>
          <FormBirthDate birthdate={data.birthdate} />
        </div>
      </div>
    </div>
  );
};

export default Biodata;
