import axios from "axios";
import { AuthService } from "../auth/AuthApiService";


export class UserApiService {

    /**
     * GET: Получаем краткую информацию о пользователе
     * @returns 
     */
    static async informationAboutUser() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/information_about_user", {
                headers: {
                },
                withCredentials: true
            });

            return req.data;
        } catch {
            const updateToken = await AuthService.updateUserToken();
            if (updateToken === true) {
                await this.informationAboutUser();
            } else {
                return false
            }
        }
    }

    /**
     * Обновление пользовательской информации
     * @param {*} userDataToUpdate 
     * @returns 
     */
    static async updateUserInformation(userDataToUpdate) {
        const req = await axios.put(process.env.REACT_APP_BACKEND_URL + "/user/update_user_information", userDataToUpdate, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        
        if (req.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Получение заказов пользователя
     * @returns 
     */
    static async userOrders() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/get_orders_by_id_user", {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            
            return req.data;
        } catch (er) {
            if (er.status === 401) {
                const updateUserTokens = await AuthService.updateUserToken();
                if (updateUserTokens === true) {
                    return this.userOrders();
                }
            }

            return false;
        }
    }

    /**
     * Обновление пароля пользователя
     * @param {*} oldPassword 
     * @param {*} newPassword 
     * @returns 
     */
    static async updateUserPassword(oldPassword, newPassword) {
        try {
            await axios.patch(process.env.REACT_APP_BACKEND_URL + "/auth/update_password", {
                "old_password": oldPassword,
                "new_password": newPassword
            }, {
                headers: {
                    withCredentials: true,
                    "Content-Type": "application/json"
                }
            });

            return true
        } catch {
            const updateUserPassword = await AuthService.updateUserToken();
            if (updateUserPassword === true) {
                return await this.updateUserPassword();
            }
            return false;
        }
    }

    /**
     * Избранные товары пользователя
     * @returns
     */
    static async userFavourites() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/favourite/get_all_favourites_by_user_id", {
                withCredentials: true
            });
            return req.data;
        } catch {
            const updateTokens = await AuthService.updateUserToken();
            if (updateTokens === true) {
                return await this.userFavourites();
            }
            return false;
        }
    }

    /**
     * Удаление избранного товара
     * @returns
     */
    static async deleteUserFavourite(id_favourite) {
        try {
            await axios.delete(process.env.REACT_APP_BACKEND_URL + "/favourite/delete_favourite_product", {
                params: {
                    id_favourite: id_favourite
                },
                withCredentials: true,
            });
            return true
        } catch {
            const updateUserToken = await AuthService.updateUserToken();
            if (updateUserToken === true) {
                return this.deleteUserFavourite(id_favourite);
            }
            return false;
        }
    }

    /**
     * Добавление нового товара в избранное
     * @param {*} id_product 
     * @returns 
     */
    static async addNewFavourite(id_product) {
        try {
            await axios.post(process.env.REACT_APP_BACKEND_URL + "/favourite/create_a_new_favourite_product", {
                id_product: id_product
            }, {
                withCredentials: true
            })

            return true;
        } catch {
            const updateUserToken = await AuthService.updateUserToken();
            if (updateUserToken === true) {
                return this.addNewFavourite(id_product);
            }
            return false;
        }
    }

    /**
     * Добавление товара в корзину
     * @param {*} id_product 
     * @returns 
     */
    static async addProductToBasket(id_product) {

        try {
            await axios.post(process.env.REACT_APP_BACKEND_URL + "/order/create_order", {
                id_product: id_product,
            }, {
                withCredentials: true
            });
            return true;
        } catch (er) {
            if (er.status === 401) {
                const updateUserTokens = await AuthService.updateUserToken();
                if (updateUserTokens === true) {
                    return this.addProductToBasket(id_product);
                }
            }
            return false;
        }
    }

    /**
     * Список заказов пользователя
     * @returns 
     */
    static async userOrders() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/get_orders_by_id_user", {
                withCredentials: true
            });

            return req.data
        } catch (er) {
            if (er.status === 401) {
                const updateUserTokens = await AuthService.updateUserToken();
                if (updateUserTokens === true) {
                    return this.userOrders();
                }
            }

            return false;
        }
    }


    /**
     * Удаление заказа
     * @param {*} quantity 
     * @returns 
     */
    static async deleteUserOrder(id_order) {
        try {
            await axios.delete(process.env.REACT_APP_BACKEND_URL + `/order/delete_order/${id_order}`, {
                withCredentials: true
            });

            return true;
        } catch (err) {
            if (err.status === 401) {
                const updateUserTokens = await AuthService.updateUserToken();
                if (updateUserTokens === true) {
                    return this.deleteUserOrder(id_order);
                }
            }
        }

        return false;
    }
}