import { rest } from "msw";

type ForgotReqBody = {
  email: string;
};

type ResetReqBody = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

export const handlers = [
  rest.post<ForgotReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    (req, res, ctx) => {
      const { email } = req.body;

      //quando erro
      if (email === "false@email.com") {
        return res(
          ctx.status(400),
          ctx.json({
            error: "Bad request",
            message: [
              {
                messages: [
                  {
                    message: "This email does not exist"
                  }
                ]
              }
            ]
          })
        );
      }

      //quando sucesso
      return res(
        ctx.status(200),
        ctx.json({
          ok: true
        })
      );
    }
  ),

  rest.post<ResetReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
    (req, res, ctx) => {
      const { code } = req.body;

      // quando erro
      if (code === "wrong_code") {
        return res(
          ctx.status(400),
          ctx.json({
            error: "Bad Request",
            message: [
              {
                messages: [
                  {
                    message: "Incorrect code provided."
                  }
                ]
              }
            ]
          })
        );
      }

      // quando sucesso
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email: "valid@email.com"
          }
        })
      );
    }
  )
];
