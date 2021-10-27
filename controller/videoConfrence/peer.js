"use strict";
// import {types} from 'mediasoup';
// class Peer {
//     id:string;
//     name:string;
//     transports:Map<String,any>;
//     consumers:Map<String,types.Consumer>;
//     producers:Map<String,any>;
//     constructor(socket_id:string, name:string) {
//         this.id = socket_id
//         this.name = name
//         this.transports = new Map()
//         this.consumers = new Map()
//         this.producers = new Map()
//     }
//     addTransport(transport:types.Transport) {
//         this.transports.set(transport.id, transport)
//     }
//     async connectTransport(transport_id:string, dtlsParameters:types.DtlsParameters) {
//         if (!this.transports.has(transport_id)) return
//         await this.transports.get(transport_id).connect({
//             dtlsParameters: dtlsParameters
//         });
//     }
//     async createProducer(producerTransportId:string, rtpParameters:types.RtpParameters, kind:types.MediaKind) {
//         //TODO handle null errors
//         let producer = await this.transports.get(producerTransportId).produce({
//             kind,
//             rtpParameters
//         })
//         var _this = this;
//         this.producers.set(producer.id, producer)
//         producer.on('transportclose', function() {
//             console.log(`---producer transport close--- name: ${_this.name} consumer_id: ${producer.id}`)
//             producer.close()
//             _this.producers.delete(producer.id)
//         }.bind(_this))
//         return producer
//     }
//     async createConsumer(consumer_transport_id:string, producer_id:string, rtpCapabilities:types.RtpCapabilities) {
//         let consumerTransport = this.transports.get(consumer_transport_id)
//         let consumer:types.Consumer;
//         try {
//             consumer = await consumerTransport.consume({
//                 producerId: producer_id,
//                 rtpCapabilities,
//                 paused: false //producer.kind === 'video',
//             });
//         } catch (error) {
//             console.error('consume failed', error);
//             return;
//         }
//         if (consumer.type === 'simulcast') {
//             await consumer.setPreferredLayers({
//                 spatialLayer: 2,
//                 temporalLayer: 2
//             });
//         }
//         var _this = this;
//         this.consumers.set(consumer.id, consumer)
//         consumer.on('transportclose', function() {
//             console.log(`---consumer transport close--- name: ${_this.name} consumer_id: ${consumer.id}`)
//             _this.consumers.delete(consumer.id)
//         }.bind(_this))        
//         return {
//             consumer,
//             params: {
//                 producerId: producer_id,
//                 id: consumer.id,
//                 kind: consumer.kind,
//                 rtpParameters: consumer.rtpParameters,
//                 type: consumer.type,
//                 producerPaused: consumer.producerPaused
//             }
//         }
//     }
//     closeProducer(producer_id:string) {
//         try {
//             this.producers.get(producer_id).close()
//         } catch(e) {
//             console.warn(e)
//         }        
//         this.producers.delete(producer_id)
//     }
//     getProducer(producer_id:string) {
//         return this.producers.get(producer_id)
//     }
//     close() {
//         this.transports.forEach(transport => transport.close())
//     }
//     removeConsumer(consumer_id:string) {
//         this.consumers.delete(consumer_id)
//     }
// }
// export default Peer;
