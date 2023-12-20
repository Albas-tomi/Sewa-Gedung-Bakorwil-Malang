import React from "react";
import Struktur from "../assets/img/struktur.png";
import { FaAddressCard, FaFeather, FaFileSignature } from "react-icons/fa6";

const AboutUs = () => {
  return (
    <div
      section="accordion"
      className="bg-second flex flex-col gap-y-4 px-5 md:px-10 lg:px-20 py-10"
    >
      {/* ================== SEJARAH ================== */}
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-sm font-bold text-second flex items-center gap-2 md:text-lg">
          <span>
            <FaFeather />
          </span>
          Sejarah Bakorwil
        </div>
        <div className="collapse-content">
          <div className="text-sm md:text-base text-justify">
            Lembaga Koordinasi Wilayah di Indonesia memiliki sejarah
            perkembangan yang cukup panjang, masih menjadi daerah jajahan
            Belanda dengan nama Hindia Belanda, system pemerintahan bersifat
            sentralitistis, urusan-urusan Pemerintahan Pusat maupun urusan
            Pemrintahan Daerah sampai sekecil-kecilnya diselenggarakan oleh
            Pemerintahan Pusat, yaitu terpusat ditangan Governeur Genaral.
            <br />
            <br />
            Berdasarkan Undang-Undang Pemerintahan Hindia Belanda, yang lebih
            dikenal Regerings Reglement (RR) yang dimuat dalam Stactsblad tahun
            1854 yang diberlakukan tanggal 1 Mei 1855, maka Hindia Belanda
            dibagi atas daerah adminstratif:
            <ul className="list-disc ml-14">
              <li>Gewest, yang dipimpin oleh seorang Resident</li>
              <li>Afdeling, yang dipimpin oleh Asisten Resident</li>
              <li>Oderafdeling, yang dipimpin oleh Controleur</li>
            </ul>
            <br />
            Pada masa tersebut tugas Koordinasi wilayah dipegang oleh Residen
            sebagai pejabat pusat yang juga merupakan Kepala Wilayah
            Pemerintahan Karesidenan. Dalam menjalankan tugas pokok dan fungsi
            sebagai pengawas, memperoleh delegasi wewenang dari Pemerintah
            Pusat. Kewenangan Residen bertanggung jawab atas kelancaran segala
            kegiatan di bidang Pemerintahan yang ada di wilayahnya.
            <br />
            <br />
            Dalam perkembangan seklanjutnya, pada tahun 1922 Pemerintah Belanda
            mengeluarkan perubahan susunan pemerintahan, yang dikenal dengan
            sebutan Bestuursher Vorming Wety (1922), dengan jenjang Pemerintahan
            :
            <ul className="list-decimal ml-14">
              <li>Governeur General (Gubernur Jenderal)</li>
              <li>Governeur (Gubernur)</li>
              <li>Resident (Pembantu Gubernur)</li>
              <li>Assisten Resident (Bupati)</li>
              <li>Controleur (Wedana)</li>
              <li>Aspirant Controleur (Camat)</li>
            </ul>
            <br />
            Sejalan dengan perubahan susunan Pemerintahan Hindia Belanda
            kedudukan Resident berubah menjadi Kepala Pemerintahan wilayah
            mewakili Governeur. Resident harus melaksanakan perintah Governeur
            dan berkewajiban mengawasi aparat Kabupaten serta mengawasai
            jalannya Pemerintahan dalam wilayahnya. Pada masa tersebut jabatan
            Governeur Jenderal. Governeur dan Resident hanya dipegang oleh
            bangsa Belanda dan jabatan lainnya yaitu Asisten Resident sampai
            Aspirant Controleur di jabat oleh bangsa Indonesia (Pribumi).
            <br />
            <br />
            Pada masa Pemerintahan pendudukan Jepang (1942-1945) fungsi,
            peranan, wewenang Resident dikembalikan penuh seperti pada keadaan
            pada tahun 1854, yaitu sebagai Kepala Wilayah Karesidenan
            Kepresidenan (Syuu) yang dijabat oleh Syuu Cokan juga dari bangsa
            Jepang, dimana administrasi pemerintahan oleh wilayah Jawa dan
            Madura terbagi atas 17 Syuu yang mempunyai tugas menjalankan
            Undang-Undang, mengurus dan mengawasi pemerintahan dibawah
            Karesidenan.
            <br />
            <br />
            Pada awal masa Pemerintahan Republik Indonesia, Resident merupakan
            organ pemerintahan Pusat yang mempunyai hak dan Kewajiban cukup
            banyak yang dasarnya adalah Undang-Undang (Ordonantie). Resident
            adalah Pamong Praja yang ditugaskan sebagai wakil Pemerintah Pusat
            disuatu daerah Pemerintahan.
            <br />
            <br />
            Selanjutnya dengan keluarnya Undang - Undang Nomor 5 Tahun 1974
            tugas Koordinator Wilayah Provinsi dibebankan kepada Pembantu
            Gubernur melalui :
            <ul>
              <li>
                Keputusan Menteri Dalam Negeri Nomor 131 Tahun 1978 tentang
                Pedoman Susunan Organisasi dan Tata Kerja Kantor Pembantu
                Gubernur.
              </li>
              <li>
                Ilustrasi Menteri Dalam Negeri No. 13 Tahun 1988 tentang
                Pelaksanaan Keputusan Menteri Dalam Negeri Nomor 131 Tahun 1978.
              </li>
            </ul>
            <br />
            Pada Tingkat Provinsi Jawa Timur dikeluarkan Surat Keputusan
            Gubernur Kepala Daerah Tingkat I Jawa Timur Nomor 640 Tahun 1988
            tentang Petunjuk Pelaksanaan Menteri Dalam Negeri Nomor 13 Tahun
            1988 dan Pelaksanaan Keputusan Menteri Dalam Negeri Nomor 131 tahun
            1978.
            <br />
            <br />
            Sesuai Keputusan Menteri Dalam Negeri Nomor 131 Tahun 1978, pembantu
            Gubernur merupakan Pejabat Pemerintahan Pusat dalam rangka
            dekonsentrasi dan bertugas membantu Gubernur dalam
            mengkoordinasikan, mengawasi dan membina penyelenggaraan
            Pemerintahan Umum dan Pembangunan yang dilaksanakan oleh Bupati
            /Walikotamadya KDH Tingkat II dalam wilyah kerjanya. Khusunya dalam
            penyelenggaraan koordinasi Pembantu Gubernur diberikan kewenangan
            yang cukup besar oleh Gubernur untuk mengkoordinasikan
            kegiatan-kegiatan yang menyangkut lintas Kabupaten/Kota melalui
            Keputusan Gubernur Nomor 640 tahun 1988.
            <br />
            <br />
            Bergulirnya reformasi membawa konsekuensi terhadap perubahan tata
            pemerintahan di Indonesia dengan dikeluarkannya Undang-Undang Nomor
            22 tahun 1999 tentang Pemerintahan Daerah yang menghapus lembaga
            pembantu dalam tata pemerintahan di Indonesia.
            <br />
            <br />
            Sebagaimana diatur dalam Undang - Undang Nomor 22 Tahun 1999
            dinyatakan bahwa Otonomi Provinsi adalah Otonomi terbatas, sedangkan
            otonomi yang luas yang utuh pada daerah Kabupaten/Kota. Pada
            dasarnya tugas-tugas yang dilaksanakan Pemerintah Provinsi meliputi
            tugas asas desentralisasi, dekonsentrasi dan medebewin (tugas
            pembantuan) yaitu :
            <ul className="list-decimal ml-14">
              <li>Kewenangan yang bersifat lintas Kabupaten/Kota.</li>
              <li>
                Kewenangan dalam bidang Pemerintahan tertentu dan dalam rangka
                koordinasi,pengawasan, pembinaan dan pengendalian.
              </li>
              <li>
                Kewenangan yang tidak atau belum dapat dilaksnakan oleh daerah
                Kabupaten/Kota.
              </li>
              <li>Kewenangan disebagian wilayah laut.</li>
              <li>
                Kewenangan pembinaan sumber daya nasional/sumber daya manusia,
                sumberdaya alam dan sumberdaya buatan.
              </li>
            </ul>
            <br />
            Selain tugas-tugas diatas, Pemerintah Provinsi juga diberi amanat
            untuk menjadi fasilitator terjadinya Otonomi luas dan utuh di
            Kabupaten/Kota agar cepat mandiri, serta sebagai perekat dan
            penyerasi hubungan Pemerintahan dengan daerah Kabupaten/Kota dalam
            konteks Negara Kesatuan Republik Indonesia.
            <br />
            <br />
            Mengingat beratnya beban tugas Gubernur, maka Jawa Timur dibentuk
            Lembaga Bakorwil Malang dengan Peraturan Daerah Provinsi Jawa Timur
            Nomor 5 tahun 2001 tentang Badan Koordinasi Wilayah Provinsi Jawa
            Timur. Pembentukan lembaga ini sesuai dengan pasal 65 Undang-Undang
            Nomor 22 tahun 1999, dimana ditegaskan bahwa di daerah dapat
            dibentuk lembaga tekniks sesuai kebutuhan daerah, sedangkan
            Nomenklatur, jenis dan jumlah unit organisasi ditetapkan Pemerintah
            Daerah Berdasarkan kemampuan, kebutuhan dan beban kerja sesuai
            dengan Peraturan Pemerintah Nomor 84 tahun 2000.
            <br />
            <br />
            Pertimbangan lain yang melatarbelakangi dibentuknya Badan Koordinasi
            Wilayah yaitu :
            <ul className="list-decimal ml-14">
              <li>
                Perlunya rentang kendali mengingat Provinsi Jawa Timur terdiri
                dari 38 (tiga puluh delapan) Kabupaten/Kota dengan kondisi
                geografis, dan sosialisasi budaya yang berbeda.
              </li>
              <li>
                Terbatasnya sumberdaya alam pada semua Kabupaten/Kota dan adanya
                kewenangan yang belum/ tidak dapat dilaksanakan memungkinkan
                daerah melakukan kerja sama pada akhirnya dapat pula terjadi
                perselisihan antar daerah. Oleh karena itu Gubernur sebagai
                wakil pemerintahan harus memfasilitasinya.
              </li>
              <li>
                Pelayanan masyarakat yang kurang optimal, karena belum memenuhi
                pada Standart Pelayanan Minimal (SPM) dimungkinkan timbulnya
                keluhan dari masyarakat, sehingga harus didorong.
              </li>
            </ul>
            <br />
            Provinsi Jawa Timur sudah berdiri 4 Bakorwil yakni di Pamekasan,
            Bojonegoro, Madiun, dan Malang, Gubernur Jawa Timur berkeinginan
            untuk merevitalisasi fungsi Bakorwil di ruanglingkup Pemerintahan
            Provinsi Jawa Timur. Berdasarkan Peraturan daerah Provinsi Jawa
            Timur No. 16 Tahun 2016 dan Peraturan Gubernur Jatim No. 134 tahun
            2016 dibentuklah 1 Bakorwil lagi di wilayah Jember yang membawahi
            Kabupaten Banyuwangi, Lumajang, Situbondo, Bondowoso, dan
            Kabupaten/Kota Probolinggo.
          </div>
        </div>
      </div>
      {/* ================== TUJUAN & SASARAN ================== */}
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-sm font-bold text-second flex items-center gap-2 md:text-lg">
          <span>
            <FaFileSignature />
          </span>
          Tujuan & Sasaran
        </div>
        <div className="collapse-content">
          <p className="text-sm md:text-base font-semibold">Tujuan </p>
          <p className="text-sm md:text-base">
            "Meningkatkan Koordinasi Penyelenggaraan Pemerintahan dan
            Pembangunan di Wilayah Kerja Bakorwil Malang"
          </p>
          <p className="text-sm font-semibold mt-2">Sasaran</p>
          <p className="text-sm md:text-base">
            "Meningkatnya hasil koordinasi pembinaan, pengawasan, supervisi,
            monitoring, dan evaluasi penyelenggaraan pemerintahan dan
            pembangunan di wilayah kerja Bakorwil Malang"
          </p>
        </div>
      </div>
      {/* ================== STRUKTUR BAKORWIL ================== */}
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-sm font-bold text-second flex items-center gap-2 md:text-lg">
          <span>
            <FaAddressCard />
          </span>
          Struktur Bakorwil
        </div>
        <div className="collapse-content">
          <h1 className="text-center font-semibold text-2xl text-second mt-5">
            Struktur Organisasi Bakorwil III Malang
          </h1>
          <img
            src={Struktur}
            alt="struktur"
            className="mt-5 w-[80%] mx-auto pb-10"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
