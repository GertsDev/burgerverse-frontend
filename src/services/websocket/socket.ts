// import { TOrdersData } from '@utils-types';

// export const WS_URL = 'wss://api.burgerverse-space.example.com';

// export enum WebsocketStatus {
//   CONNECTING = 'CONNECTING',
//   ONLINE = 'ONLINE',
//   OFFLINE = 'OFFLINE'
// }

// type WebSocketMessage = {
//   success: boolean;
//   orders: TOrdersData;
//   message?: string;
// };

// export class WebSocketService {
//   private socket: WebSocket | null = null;
//   private reconnectTimer: NodeJS.Timeout | null = null;
//   private url: string;

//   constructor(url: string) {
//     this.url = url;
//   }

//   public connect = (token?: string) => {
//     if (this.socket) {
//       this.socket.close();
//     }

//     this.socket = new WebSocket(`${this.url}${token ? `?token=${token}` : ''}`);

//     this.socket.onopen = this.handleOpen;
//     this.socket.onclose = this.handleClose;
//     this.socket.onerror = this.handleError;
//     this.socket.onmessage = this.handleMessage;
//   };

//   public disconnect = () => {
//     if (this.socket) {
//       this.socket.close();
//       this.socket = null;
//     }
//     if (this.reconnectTimer) {
//       clearTimeout(this.reconnectTimer);
//       this.reconnectTimer = null;
//     }
//   };

//   private reconnect = () => {
//     this.reconnectTimer = setTimeout(() => {
//       this.connect();
//     }, 3000);
//   };

//   private handleOpen = () => {
//     console.log('WebSocket Connected');
//     if (this.reconnectTimer) {
//       clearTimeout(this.reconnectTimer);
//       this.reconnectTimer = null;
//     }
//   };

//   private handleClose = (event: CloseEvent) => {
//     if (!event.wasClean) {
//       this.reconnect();
//     }
//   };

//   private handleError = (error: Event) => {
//     console.error('WebSocket Error:', error);
//     this.reconnect();
//   };

//   private handleMessage = (event: MessageEvent) => {
//     try {
//       const data: WebSocketMessage = JSON.parse(event.data);
//       if (data.success) {
//         // Dispatch to Redux
//         store.dispatch(updateFeedOrders(data.orders));
//       }
//     } catch (err) {
//       console.error('Failed to parse WebSocket message:', err);
//     }
//   };
// }
