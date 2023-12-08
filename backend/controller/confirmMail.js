import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const confirmAdmin = async (req, res) => {
  const { email, name, office } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sewa Kawis",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: "Konfirmasi Permohonan Penyewaan",
      table: {
        data: [
          {
            item: office,
            description:
              "'Diterima', dimohon membawa bukti konfirmasi ini dan datang 1 jam sebelum kegiatan untuk melakukan registrasi ulang",
          },
        ],
        columns: {
          customWidth: {
            item: "20%",
            description: "65%",
          },
          customAlignment: {
            description: "left",
          },
        },
      },
      outro: "SewaKawis Bakorwil 3 Malang",
    },
  };
  let mail = MailGenerator.generate(response);
  let messsage = {
    from: process.env.EMAIL,
    to: email,
    subject: "Permohonan Penyewaan Gedung Bakorwil 3 Malang",
    html: mail,
  };
  transporter
    .sendMail(messsage)
    .then(() => {
      return res.status(201).json({
        msg: "CEK YOUR EMAIL",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
export const confirmTolakmAdmin = async (req, res) => {
  const { email, name, office } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sewa Kawis",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: "Konfirmasi Permohonan Penyewaan",
      table: {
        data: [
          {
            item: office,
            description:
              "'Mohon maaf, permohonan anda ditolak. Kami menghargai partisipasi Anda dan berharap dapat melayani Anda di kesempatan lain.'",
          },
        ],
        columns: {
          customWidth: {
            item: "20%",
            description: "65%",
          },
          customAlignment: {
            description: "left",
          },
        },
      },
      outro: "SewaKawis Bakorwil 3 Malang",
    },
  };
  let mail = MailGenerator.generate(response);
  let messsage = {
    from: process.env.EMAIL,
    to: email,
    subject: "Permohonan Penyewaan Gedung Bakorwil 3 Malang",
    html: mail,
  };
  transporter
    .sendMail(messsage)
    .then(() => {
      return res.status(201).json({
        msg: "CEK YOUR EMAIL",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const confirCancelmAdmin = async (req, res) => {
  const { email, name, office } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sewa Kawis",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: "Konfirmasi Permohonan Pembatalan",
      table: {
        data: [
          {
            item: office,
            description:
              "Permintaan pembatalan Anda telah diterima. Jika Anda telah melakukan pembayaran uang muka atau pembayaran lainnya, kami mohon untuk menghubungi nomor berikut https://wa.me/6283849359663 dan menyediakan bukti pembayaran yang telah dilakukan sebelumnya,  dengan pengembalian terpotong 10% dari yang dibayarkan.",
          },
        ],
        columns: {
          customWidth: {
            item: "20%",
            description: "65%",
          },
          customAlignment: {
            description: "left",
          },
        },
      },
      outro: "SewaKawis Bakorwil 3 Malang",
    },
  };
  let mail = MailGenerator.generate(response);
  let messsage = {
    from: process.env.EMAIL,
    to: email,
    subject: "Permohonan Penyewaan Gedung Bakorwil 3 Malang",
    html: mail,
  };
  transporter
    .sendMail(messsage)
    .then(() => {
      return res.status(201).json({
        msg: "CEK YOUR EMAIL",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
export const tolakCancelAdmin = async (req, res) => {
  const { email, name, office } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sewa Kawis",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: "Konfirmasi Permohonan Pembatalan",
      table: {
        data: [
          {
            item: office,
            description:
              "Maaf, permintaan pembatalan Anda tidak dapat diproses. Jika Anda telah melakukan pembayaran uang muka atau pembayaran lainnya, silakan menghubungi nomor berikut https://wa.me/6283849359663 dan menyediakan bukti pembayaran yang telah dilakukan sebelumnya, dengan pengembalian terpotong 10% dari jumlah yang dibayarkan.",
          },
        ],
        columns: {
          customWidth: {
            item: "20%",
            description: "65%",
          },
          customAlignment: {
            description: "left",
          },
        },
      },
      outro: "SewaKawis Bakorwil 3 Malang",
    },
  };
  let mail = MailGenerator.generate(response);
  let messsage = {
    from: process.env.EMAIL,
    to: email,
    subject: "Permohonan Penyewaan Gedung Bakorwil 3 Malang",
    html: mail,
  };
  transporter
    .sendMail(messsage)
    .then(() => {
      return res.status(201).json({
        msg: "CEK YOUR EMAIL",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
