import * as LLSD from '@caspertech/llsd';
import * as request from 'request';
import {Region} from './Region';
import {Subscription} from 'rxjs/internal/Subscription';
import {EventQueueClient} from './EventQueueClient';
import {UUID} from './UUID';
import {ClientEvents} from './ClientEvents';
import {Agent} from './Agent';
import {Subject} from 'rxjs/internal/Subject';
import {HTTPAssets} from '..';

export class Caps
{
    static CAP_INVOCATION_DELAY_MS: {[key: string]: number} = {
        'NewFileAgentInventory': 2000,
        'FetchInventory2': 200
    };

    private region: Region;
    private onGotSeedCap: Subject<void> = new Subject<void>();
    private gotSeedCap = false;
    private capabilities: { [key: string]: string } = {};
    private clientEvents: ClientEvents;
    private agent: Agent;
    private active = false;
    private timeLastCapExecuted: {[key: string]: number} = {};
    eventQueueClient: EventQueueClient | null = null;

    constructor(agent: Agent, region: Region, seedURL: string, clientEvents: ClientEvents)
    {
        this.agent = agent;
        this.clientEvents = clientEvents;
        this.region = region;
        const req: string[] = [];
        req.push('AgentPreferences');
        req.push('AgentState');
        req.push('AttachmentResources');
        req.push('AvatarPickerSearch');
        req.push('AvatarRenderInfo');
        req.push('CharacterProperties');
        req.push('ChatSessionRequest');
        req.push('CopyInventoryFromNotecard');
        req.push('CreateInventoryCategory');
        req.push('DispatchRegionInfo');
        req.push('DirectDelivery');
        req.push('EnvironmentSettings');
        req.push('EstateChangeInfo');
        req.push('EventQueueGet');
        req.push('FacebookConnect');
        req.push('FlickrConnect');
        req.push('TwitterConnect');
        req.push('FetchLib2');
        req.push('FetchLibDescendents2');
        req.push('FetchInventory2');
        req.push('FetchInventoryDescendents2');
        req.push('IncrementCOFVersion');
        req.push('GetDisplayNames');
        req.push('GetExperiences');
        req.push('AgentExperiences');
        req.push('FindExperienceByName');
        req.push('GetExperienceInfo');
        req.push('GetAdminExperiences');
        req.push('GetCreatorExperiences');
        req.push('ExperiencePreferences');
        req.push('GroupExperiences');
        req.push('UpdateExperience');
        req.push('IsExperienceAdmin');
        req.push('IsExperienceContributor');
        req.push('RegionExperiences');
        req.push('GetMetadata');
        req.push('GetObjectCost');
        req.push('GetObjectPhysicsData');
        req.push('GroupAPIv1');
        req.push('GroupMemberData');
        req.push('GroupProposalBallot');
        req.push('HomeLocation');
        req.push('LandResources');
        req.push('LSLSyntax');
        req.push('MapLayer');
        req.push('MapLayerGod');
        req.push('MeshUploadFlag');
        req.push('NavMeshGenerationStatus');
        req.push('NewFileAgentInventory');
        req.push('ObjectMedia');
        req.push('ObjectMediaNavigate');
        req.push('ObjectNavMeshProperties');
        req.push('ParcelPropertiesUpdate');
        req.push('ParcelVoiceInfoRequest');
        req.push('ProductInfoRequest');
        req.push('ProvisionVoiceAccountRequest');
        req.push('RemoteParcelRequest');
        req.push('RenderMaterials');
        req.push('RequestTextureDownload');
        req.push('ResourceCostSelected');
        req.push('RetrieveNavMeshSrc');
        req.push('SearchStatRequest');
        req.push('SearchStatTracking');
        req.push('SendPostcard');
        req.push('SendUserReport');
        req.push('SendUserReportWithScreenshot');
        req.push('ServerReleaseNotes');
        req.push('SetDisplayName');
        req.push('SimConsoleAsync');
        req.push('SimulatorFeatures');
        req.push('StartGroupProposal');
        req.push('TerrainNavMeshProperties');
        req.push('TextureStats');
        req.push('UntrustedSimulatorMessage');
        req.push('UpdateAgentInformation');
        req.push('UpdateAgentLanguage');
        req.push('UpdateAvatarAppearance');
        req.push('UpdateGestureAgentInventory');
        req.push('UpdateGestureTaskInventory');
        req.push('UpdateNotecardAgentInventory');
        req.push('UpdateNotecardTaskInventory');
        req.push('UpdateScriptAgent');
        req.push('UpdateScriptTask');
        req.push('UploadBakedTexture');
        req.push('ViewerAsset');
        req.push('ViewerMetrics');
        req.push('ViewerStartAuction');
        req.push('ViewerStats');
        this.active = true;
        this.request(seedURL, LLSD.LLSD.formatXML(req), 'application/llsd+xml').then((body: string) =>
        {
            this.capabilities = LLSD.LLSD.parseXML(body);
            this.gotSeedCap = true;
            this.onGotSeedCap.next();
            if (this.capabilities['EventQueueGet'])
            {
                if (this.eventQueueClient !== null)
                {
                    this.eventQueueClient.shutdown();
                }
                this.eventQueueClient = new EventQueueClient(this.agent, this, this.clientEvents);
            }
        }).catch((err) =>
        {
            console.error('Error getting seed capability');
            console.error(err);
        });
    }

    downloadAsset(uuid: UUID, type: HTTPAssets): Promise<Buffer>
    {
        return new Promise<Buffer>((resolve, reject) =>
        {
            this.getCapability('ViewerAsset').then((url) =>
            {
                const assetURL = url + '/?' + type + '_id=' + uuid.toString();
                request({
                    'uri': assetURL,
                    'rejectUnauthorized': false,
                    'method': 'GET',
                    'encoding': null
                }, (err, res, body) =>
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve(body);
                    }
                });
            });
        });
    }

    request(url: string, data: string | Buffer, contentType: string): Promise<string>
    {
        return new Promise<string>((resolve, reject) =>
        {
            request({
                'headers': {
                    'Content-Length': data.length,
                    'Content-Type': contentType
                },
                'uri': url,
                'body': data,
                'rejectUnauthorized': false,
                'method': 'POST'
            }, (err, res, body) =>
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(body);
                }
            });
        });
    }

    requestGet(url: string): Promise<string>
    {
        return new Promise<string>((resolve, reject) =>
        {
            request({
                'uri': url,
                'rejectUnauthorized': false,
                'method': 'GET'
            }, (err, res, body) =>
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(body);
                }
            });
        });
    }

    waitForSeedCapability(): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            if (this.gotSeedCap)
            {
                resolve();
            }
            else
            {
                const sub: Subscription = this.onGotSeedCap.subscribe(() =>
                {
                    sub.unsubscribe();
                    resolve();
                });
            }
        });
    }

    getCapability(capability: string): Promise<string>
    {
        return new Promise<string>((resolve, reject) =>
        {
            if (!this.active)
            {
                reject(new Error('Requesting getCapability to an inactive Caps instance'));
                return;
            }
            this.waitForSeedCapability().then(() =>
            {
                if (this.capabilities[capability])
                {
                    resolve(this.capabilities[capability]);
                }
                else
                {
                    reject(new Error('Capability not available'));
                }
            });
        });
    }

    capsRequestUpload(url: string, data: Buffer): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            this.request(url, data, 'application/octet-stream').then((body: string) =>
            {
                resolve(LLSD.LLSD.parseXML(body));
            }).catch((err) =>
            {
                console.error(err);
                reject(err);
            });
        });
    }

    capsGetXML(capability: string): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            this.getCapability(capability).then((url) =>
            {
                this.requestGet(url).then((body: string) =>
                {
                    let result: any = null;
                    try
                    {
                        result = LLSD.LLSD.parseXML(body);
                    }
                    catch (err)
                    {
                        console.error('Error parsing LLSD');
                        console.error(body);
                        reject(err);
                    }
                    resolve(result);
                }).catch((err) =>
                {
                    console.error(err);
                    reject(err);
                });
            }).catch((err) =>
            {
                reject(err);
            });
        });
    }

    private waitForCapTimeout(capName: string): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            if (!Caps.CAP_INVOCATION_DELAY_MS[capName])
            {
                resolve();
            }
            else
            {
                if (!this.timeLastCapExecuted[capName] || this.timeLastCapExecuted[capName] < (new Date().getTime() - Caps.CAP_INVOCATION_DELAY_MS[capName]))
                {
                    this.timeLastCapExecuted[capName] = new Date().getTime();
                }
                else
                {
                    this.timeLastCapExecuted[capName] += Caps.CAP_INVOCATION_DELAY_MS[capName];
                }
                const timeToWait = this.timeLastCapExecuted[capName] - new Date().getTime();
                if (timeToWait > 0)
                {
                    setTimeout(() =>
                    {
                        resolve();
                    }, timeToWait);
                }
                else
                {
                    resolve();
                }
            }
        });
    }

    capsPerformXMLRequest(url: string, data: any): Promise<any>
    {
        return new Promise<any>(async (resolve, reject) =>
        {
            const xml = LLSD.LLSD.formatXML(data);
            this.request(url, xml, 'application/llsd+xml').then((body: string) =>
            {
                let result: any = null;
                try
                {
                    result = LLSD.LLSD.parseXML(body);
                    resolve(result);
                }
                catch (err)
                {
                    reject(err);
                }
            }).catch((err) =>
            {
                console.error(err);
                reject(err);
            });
        });
    }

    async capsRequestXML(capability: string, data: any, debug = false): Promise<any>
    {
        if (debug)
        {
            console.log(data);
        }

        await this.waitForCapTimeout(capability);

        const url = await this.getCapability(capability);
        try
        {
            return await this.capsPerformXMLRequest(url, data);
        }
        catch (error)
        {
            console.log('Error with cap ' + capability);
            console.log(error);
            throw error;
        }
    }

    shutdown()
    {
        this.onGotSeedCap.complete();
        if (this.eventQueueClient)
        {
            this.eventQueueClient.shutdown();
        }
        this.active = false;
    }
}
