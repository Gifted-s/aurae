#!/usr/bin/env auraescript
/* -------------------------------------------------------------------------- *\
 *        Apache 2.0 License Copyright © 2022-2023 The Aurae Authors          *
 *                                                                            *
 *                +--------------------------------------------+              *
 *                |   █████╗ ██╗   ██╗██████╗  █████╗ ███████╗ |              *
 *                |  ██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔════╝ |              *
 *                |  ███████║██║   ██║██████╔╝███████║█████╗   |              *
 *                |  ██╔══██║██║   ██║██╔══██╗██╔══██║██╔══╝   |              *
 *                |  ██║  ██║╚██████╔╝██║  ██║██║  ██║███████╗ |              *
 *                |  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ |              *
 *                +--------------------------------------------+              *
 *                                                                            *
 *                         Distributed Systems Runtime                        *
 *                                                                            *
 * -------------------------------------------------------------------------- *
 *                                                                            *
 *   Licensed under the Apache License, Version 2.0 (the "License");          *
 *   you may not use this file except in compliance with the License.         *
 *   You may obtain a copy of the License at                                  *
 *                                                                            *
 *       http://www.apache.org/licenses/LICENSE-2.0                           *
 *                                                                            *
 *   Unless required by applicable law or agreed to in writing, software      *
 *   distributed under the License is distributed on an "AS IS" BASIS,        *
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 *   See the License for the specific language governing permissions and      *
 *   limitations under the License.                                           *
 *                                                                            *
\* -------------------------------------------------------------------------- */
import * as helpers from "../auraescript/helpers.ts";
import * as cri from "../auraescript/gen/cri.ts";

// Start working on pods_service with CRI
let runtime = new cri.RuntimeServiceClient();

let pod = await runtime.runPodSandbox(<cri.RunPodSandboxRequest>{
    config: cri.PodSandboxConfig.fromPartial({
        hostname: "nova",
        logDirectory: "/var/log",
        portMappings: cri.PortMapping[{}],
        linux: cri.LinuxPodSandboxConfig.fromPartial({
             cgroupParent: "",
            // overhead: undefined,
            // resources: undefined,
            // securityContext: undefined,
            // sysctls: undefined
        }),
        metadata: cri.PodSandboxMetadata.fromPartial({
            name: "aurae-nginx",
        }),
    })
})
helpers.print(pod)

let container = runtime.createContainer(<cri.CreateContainerRequest>{
    podSandboxId: pod.podSandboxId,
    config: cri.ContainerConfig.fromPartial({
        tty: false,
        image: "nginx",
        metadata: cri.ContainerMetadata.fromPartial({
            name: "nginx",
        })
    }),

})
helpers.print(container)

