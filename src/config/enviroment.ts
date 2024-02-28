
interface ICredentials {
	NODE_PORT: string;
	NODE_ENV: string;
	MYSQL_HOST: string;
	MYSQL_DB: string;
	MYSQL_USER: string;
	MYSQL_PASS: string;
	MYSQL_PORT: number;
	JWT_TOKEN_PASS: string;
}

export const loadCredentials = (): ICredentials => {
	return {
		NODE_PORT: process.env.NODE_PORT!,
		NODE_ENV: process.env.NODE_ENV!,

		MYSQL_HOST: process.env.MYSQL_HOST!,
		MYSQL_DB: process.env.MYSQL_DB!,
		MYSQL_USER: process.env.MYSQL_USER!,
		MYSQL_PASS: process.env.MYSQL_PASS!,
		MYSQL_PORT: parseInt(process.env.MYSQL_PORT!, 3306),

		JWT_TOKEN_PASS: process.env.JWT_TOKEN_PASS!,
	};
};
