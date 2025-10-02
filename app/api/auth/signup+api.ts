/**
 * @public
 * @author Marc Stöckli - Codemize GmbH
 * @description Signup endpoint which is used for signing up a new user with better-auth
 * @param {Request} req - Request object
 * @since 0.0.2
 * @version 0.0.1 */
export const GET = async (
  req: Request
) => {
  return Response.json({
    status: 200,
    message: "Signup endpoint"
  });
}